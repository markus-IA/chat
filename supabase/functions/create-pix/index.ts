const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, description, external_id } = await req.json()

    if (!amount || typeof amount !== 'number' || amount < 1) {
      return new Response(
        JSON.stringify({ success: false, error: 'amount deve ser >= 1' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get('TELEPAGAMENTO_API_KEY')
    if (!apiKey) {
      console.error('TELEPAGAMENTO_API_KEY not configured')
      return new Response(
        JSON.stringify({ success: false, error: 'API key não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Creating PIX charge: R$ ${amount}`)

    const response = await fetch('https://telepagamento.com/api/pix/create', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        description: description || `Pagamento R$ ${amount}`,
        external_id: external_id || `pay-${Date.now()}`,
        expiration: 1800,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Telepagamento API error:', JSON.stringify(data))
      return new Response(
        JSON.stringify({ success: false, error: data.error || data.message || `Erro ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const transaction = data.transaction ?? data
    console.log('PIX created successfully, id:', transaction?.id)

    return new Response(
      JSON.stringify({ success: true, transaction }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating PIX:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
