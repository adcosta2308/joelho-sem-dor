import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Variáveis de ambiente do Supabase não configuradas' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const results = {
      free: { success: false, message: '', details: '' },
      premium: { success: false, message: '', details: '' }
    }

    // DELETAR USUÁRIOS EXISTENTES PRIMEIRO
    console.log('🗑️ Removendo usuários existentes...')
    try {
      const { data: users } = await supabase.auth.admin.listUsers()
      
      if (users?.users) {
        for (const user of users.users) {
          if (user.email === 'teste_free@orthoxis.com' || user.email === 'teste_premium@orthoxis.com') {
            const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
            if (deleteError) {
              console.log(`Erro ao deletar ${user.email}:`, deleteError.message)
            } else {
              console.log(`✓ Removido: ${user.email}`)
            }
          }
        }
      }
    } catch (error: any) {
      console.log('Nenhum usuário anterior encontrado:', error.message)
    }

    // Aguardar um pouco para garantir que a deleção foi processada
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Criar usuário FREE
    console.log('📝 Criando usuário FREE...')
    try {
      const { data: freeUser, error: freeError } = await supabase.auth.admin.createUser({
        email: 'teste_free@orthoxis.com',
        password: '12345678',
        email_confirm: true,
        user_metadata: {
          nome: 'Usuário Free'
        }
      })

      if (freeError) {
        results.free.message = `Erro ao criar usuário: ${freeError.message}`
        results.free.details = JSON.stringify(freeError)
      } else if (freeUser.user) {
        console.log(`✓ Usuário FREE criado com ID: ${freeUser.user.id}`)
        
        // Criar perfil FREE
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: freeUser.user.id,
            nome: 'Usuário Free',
            email: 'teste_free@orthoxis.com',
            plano: 'free',
            trilhaRecomendada: null,
            trialEndsAt: null,
            trilhaComprada: null,
            progresso: {}
          }, {
            onConflict: 'id'
          })

        if (profileError) {
          results.free.message = `Usuário criado mas erro no perfil: ${profileError.message}`
          results.free.details = JSON.stringify(profileError)
        } else {
          results.free.success = true
          results.free.message = '✅ Usuário FREE criado com sucesso'
          results.free.details = `ID: ${freeUser.user.id}`
          console.log('✓ Perfil FREE criado')
        }
      }
    } catch (error: any) {
      results.free.message = `Exceção: ${error.message}`
      results.free.details = JSON.stringify(error)
    }

    // Criar usuário PREMIUM
    console.log('📝 Criando usuário PREMIUM...')
    try {
      const { data: premiumUser, error: premiumError } = await supabase.auth.admin.createUser({
        email: 'teste_premium@orthoxis.com',
        password: '12345678',
        email_confirm: true,
        user_metadata: {
          nome: 'Usuário Premium'
        }
      })

      if (premiumError) {
        results.premium.message = `Erro ao criar usuário: ${premiumError.message}`
        results.premium.details = JSON.stringify(premiumError)
      } else if (premiumUser.user) {
        console.log(`✓ Usuário PREMIUM criado com ID: ${premiumUser.user.id}`)
        
        // Criar perfil PREMIUM
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: premiumUser.user.id,
            nome: 'Usuário Premium',
            email: 'teste_premium@orthoxis.com',
            plano: 'premium',
            trilhaRecomendada: 'joelho-condromalacia',
            trialEndsAt: null,
            trilhaComprada: null,
            progresso: {}
          }, {
            onConflict: 'id'
          })

        if (profileError) {
          results.premium.message = `Usuário criado mas erro no perfil: ${profileError.message}`
          results.premium.details = JSON.stringify(profileError)
        } else {
          results.premium.success = true
          results.premium.message = '✅ Usuário PREMIUM criado com sucesso'
          results.premium.details = `ID: ${premiumUser.user.id}`
          console.log('✓ Perfil PREMIUM criado')
        }
      }
    } catch (error: any) {
      results.premium.message = `Exceção: ${error.message}`
      results.premium.details = JSON.stringify(error)
    }

    const allSuccess = results.free.success && results.premium.success

    return NextResponse.json({
      success: allSuccess,
      message: allSuccess 
        ? '✨ Todos os usuários foram criados com sucesso!' 
        : '⚠️ Houve problemas ao criar alguns usuários',
      results,
      credentials: {
        free: {
          email: 'teste_free@orthoxis.com',
          password: '12345678',
          plano: 'free'
        },
        premium: {
          email: 'teste_premium@orthoxis.com',
          password: '12345678',
          plano: 'premium'
        }
      },
      instructions: allSuccess 
        ? '🎉 Agora você pode fazer login com as credenciais acima!' 
        : '⚠️ Verifique os detalhes dos erros acima e tente novamente'
    })
  } catch (error: any) {
    console.error('Erro geral:', error)
    return NextResponse.json(
      { 
        error: error.message,
        details: JSON.stringify(error),
        stack: error.stack 
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  return GET()
}
