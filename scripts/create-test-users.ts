/**
 * Script para criar usuários de teste no Supabase
 * 
 * Execute este script com: npx tsx scripts/create-test-users.ts
 * 
 * Certifique-se de ter as variáveis de ambiente configuradas:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'

async function createTestUsers() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Variáveis de ambiente não configuradas')
    console.error('Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('🚀 Iniciando criação de usuários de teste...\n')

  // Deletar usuários existentes
  console.log('🗑️  Removendo usuários existentes...')
  try {
    const { data: users } = await supabase.auth.admin.listUsers()
    
    if (users?.users) {
      for (const user of users.users) {
        if (user.email === 'teste_free@orthoxis.com' || user.email === 'teste_premium@orthoxis.com') {
          await supabase.auth.admin.deleteUser(user.id)
          console.log(`   ✓ Removido: ${user.email}`)
        }
      }
    }
  } catch (error: any) {
    console.log('   ⚠️  Nenhum usuário anterior encontrado')
  }

  console.log('\n📝 Criando novos usuários...\n')

  // Criar usuário FREE
  console.log('1️⃣  Criando usuário FREE...')
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
      console.error(`   ❌ Erro: ${freeError.message}`)
    } else if (freeUser.user) {
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
        console.error(`   ❌ Erro no perfil: ${profileError.message}`)
      } else {
        console.log('   ✅ Usuário FREE criado com sucesso!')
        console.log('   📧 Email: teste_free@orthoxis.com')
        console.log('   🔑 Senha: 12345678')
        console.log('   📦 Plano: free')
      }
    }
  } catch (error: any) {
    console.error(`   ❌ Erro: ${error.message}`)
  }

  console.log('\n2️⃣  Criando usuário PREMIUM...')
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
      console.error(`   ❌ Erro: ${premiumError.message}`)
    } else if (premiumUser.user) {
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
        console.error(`   ❌ Erro no perfil: ${profileError.message}`)
      } else {
        console.log('   ✅ Usuário PREMIUM criado com sucesso!')
        console.log('   📧 Email: teste_premium@orthoxis.com')
        console.log('   🔑 Senha: 12345678')
        console.log('   📦 Plano: premium')
      }
    }
  } catch (error: any) {
    console.error(`   ❌ Erro: ${error.message}`)
  }

  console.log('\n✨ Processo concluído!\n')
  console.log('📋 Resumo dos usuários criados:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('👤 FREE:')
  console.log('   Email: teste_free@orthoxis.com')
  console.log('   Senha: 12345678')
  console.log('   Plano: free')
  console.log('')
  console.log('👤 PREMIUM:')
  console.log('   Email: teste_premium@orthoxis.com')
  console.log('   Senha: 12345678')
  console.log('   Plano: premium')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

createTestUsers()
