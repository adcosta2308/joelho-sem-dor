export interface AulaRapida {
  id: string;
  titulo: string;
  subtitulo: string;
  duracao: string;
  categoria: 'fundamentos' | 'tecnicas' | 'avancado' | 'estilo-vida';
  conteudo: {
    introducao: string;
    pontosprincipais: string[];
    aplicacaoPratica: string[];
  };
}

export const aulasRapidas: AulaRapida[] = [
  // FUNDAMENTOS
  {
    id: 'o-que-e-condromalacia',
    titulo: 'O que é condromalácia?',
    subtitulo: 'Entenda a causa da sua dor',
    duracao: '3 min',
    categoria: 'fundamentos',
    conteudo: {
      introducao: 'A condromalácia patelar é o amolecimento da cartilagem que reveste a parte de trás da patela (rótula). Quando essa cartilagem se desgasta ou inflama, causa dor ao dobrar o joelho, subir escadas ou ficar sentado por muito tempo. É uma das causas mais comuns de dor na frente do joelho, especialmente em pessoas jovens e ativas.',
      pontosprincipais: [
        'Amolecimento da cartilagem atrás da patela',
        'Causa dor ao dobrar o joelho e subir escadas',
        'Comum em pessoas jovens e ativas',
        'Tratamento conservador é eficaz na maioria dos casos'
      ],
      aplicacaoPratica: [
        'Evite ficar muito tempo com joelho dobrado',
        'Fortaleça quadríceps e glúteos progressivamente',
        'Use gelo após atividades que causem dor',
        'Respeite os limites do seu corpo durante exercícios'
      ]
    }
  },
  {
    id: 'por-que-doi-ao-agachar',
    titulo: 'Por que dói ao agachar?',
    subtitulo: 'Mecânica do movimento',
    duracao: '4 min',
    categoria: 'fundamentos',
    conteudo: {
      introducao: 'A dor ao agachar acontece porque o movimento aumenta a pressão entre a patela e o fêmur. Quando você desce no agachamento, a patela precisa deslizar suavemente sobre o fêmur. Se há desequilíbrio muscular, fraqueza ou desalinhamento, essa pressão aumenta e causa dor. A boa notícia é que com técnica correta e fortalecimento adequado, é possível agachar sem dor.',
      pontosprincipais: [
        'Agachamento aumenta pressão na articulação do joelho',
        'Desalinhamento e fraqueza muscular pioram a dor',
        'Técnica correta distribui melhor a carga',
        'Fortalecimento progressivo reduz a dor'
      ],
      aplicacaoPratica: [
        'Comece com agachamentos parciais (até 45 graus)',
        'Mantenha joelhos alinhados com os pés',
        'Fortaleça glúteos para reduzir sobrecarga no joelho',
        'Aumente a profundidade gradualmente conforme melhora'
      ]
    }
  },
  {
    id: 'o-que-piora-a-dor',
    titulo: 'O que piora a dor?',
    subtitulo: 'Evite esses erros comuns',
    duracao: '3 min',
    categoria: 'fundamentos',
    conteudo: {
      introducao: 'Alguns movimentos e hábitos podem piorar significativamente a dor no joelho. Ficar muito tempo sentado com joelho dobrado, subir e descer escadas repetidamente, correr em superfícies duras e fazer agachamentos profundos sem preparo são os principais vilões. Identificar e modificar esses comportamentos é essencial para a recuperação.',
      pontosprincipais: [
        'Ficar sentado por longos períodos piora a dor',
        'Escadas e rampas aumentam a pressão na patela',
        'Corrida em superfície dura sobrecarrega o joelho',
        'Agachamentos profundos sem preparo causam dor'
      ],
      aplicacaoPratica: [
        'Levante-se e movimente-se a cada 30-40 minutos',
        'Use corrimão ao subir escadas e vá devagar',
        'Prefira superfícies macias para caminhar/correr',
        'Respeite a progressão gradual nos exercícios'
      ]
    }
  },
  {
    id: 'peso-e-joelho',
    titulo: 'Por que o peso aumenta a dor no joelho',
    subtitulo: 'Entenda a relação',
    duracao: '4 min',
    categoria: 'fundamentos',
    conteudo: {
      introducao: 'Cada quilo extra no corpo representa 3-4 quilos de pressão adicional sobre o joelho durante a caminhada. Isso significa que perder apenas 5kg pode reduzir até 20kg de pressão sobre suas articulações. Além disso, o excesso de peso aumenta a inflamação no corpo, o que também piora a dor. A boa notícia é que exercícios de baixo impacto podem ajudar na perda de peso sem agravar o joelho.',
      pontosprincipais: [
        'Cada 1kg extra = 3-4kg de pressão no joelho',
        'Perda de peso reduz significativamente a dor',
        'Excesso de peso aumenta inflamação sistêmica',
        'Exercícios de baixo impacto são seguros e eficazes'
      ],
      aplicacaoPratica: [
        'Foque em exercícios sem impacto (natação, bicicleta)',
        'Combine exercícios com alimentação balanceada',
        'Celebre pequenas perdas de peso - fazem diferença',
        'Não espere perder peso para começar a se exercitar'
      ]
    }
  },
  {
    id: 'importancia-quadriceps',
    titulo: 'Importância do quadríceps',
    subtitulo: 'Músculo protetor do joelho',
    duracao: '3 min',
    categoria: 'fundamentos',
    conteudo: {
      introducao: 'O quadríceps é o principal estabilizador do joelho. Quando está forte, ele absorve impacto, controla o movimento da patela e reduz a pressão na articulação. A fraqueza do quadríceps é uma das principais causas de dor no joelho. Fortalecer esse músculo de forma progressiva e controlada é fundamental para eliminar a dor e prevenir lesões futuras.',
      pontosprincipais: [
        'Quadríceps controla o movimento da patela',
        'Músculo forte absorve impacto e protege a articulação',
        'Fraqueza do quadríceps é causa comum de dor',
        'Fortalecimento progressivo é essencial'
      ],
      aplicacaoPratica: [
        'Comece com exercícios isométricos (sem movimento)',
        'Evolua para extensões de joelho controladas',
        'Inclua agachamentos parciais progressivamente',
        'Mantenha consistência - resultados levam semanas'
      ]
    }
  },
  {
    id: 'movimento-como-alivio',
    titulo: 'Movimento como alívio',
    subtitulo: 'Por que repouso total não funciona',
    duracao: '4 min',
    categoria: 'fundamentos',
    conteudo: {
      introducao: 'Ao contrário do que muitos pensam, repouso total não é a melhor solução para dor no joelho. O movimento controlado e progressivo estimula a circulação, reduz rigidez, fortalece músculos e melhora a nutrição da cartilagem. A chave é encontrar o equilíbrio: movimento suficiente para estimular recuperação, mas sem sobrecarregar a articulação.',
      pontosprincipais: [
        'Repouso total enfraquece músculos e piora rigidez',
        'Movimento controlado estimula recuperação',
        'Exercício melhora circulação e nutrição da cartilagem',
        'Equilíbrio entre movimento e descanso é essencial'
      ],
      aplicacaoPratica: [
        'Movimente-se diariamente, mesmo com dor leve',
        'Escolha exercícios de baixo impacto',
        'Respeite dor intensa - é sinal de parar',
        'Aumente intensidade gradualmente ao longo das semanas'
      ]
    }
  },

  // TÉCNICAS
  {
    id: 'como-agachar-certo',
    titulo: 'Como agachar certo?',
    subtitulo: 'Técnica segura e eficaz',
    duracao: '5 min',
    categoria: 'tecnicas',
    conteudo: {
      introducao: 'Agachar corretamente é fundamental para proteger os joelhos. A técnica correta envolve manter os joelhos alinhados com os pés, empurrar o quadril para trás, manter o peso nos calcanhares e descer apenas até onde consegue manter a forma. Começar com agachamentos parciais e progredir gradualmente é a chave para agachar sem dor.',
      pontosprincipais: [
        'Mantenha joelhos alinhados com os pés (não deixe entrar)',
        'Empurre quadril para trás como se fosse sentar',
        'Mantenha peso nos calcanhares, não nas pontas dos pés',
        'Comece com amplitude parcial e progrida gradualmente'
      ],
      aplicacaoPratica: [
        'Use uma cadeira atrás como referência inicial',
        'Pratique em frente ao espelho para checar alinhamento',
        'Comece descendo apenas 30-45 graus',
        'Aumente profundidade apenas quando não houver dor'
      ]
    }
  },
  {
    id: 'ativando-gluteos',
    titulo: 'Ativando glúteos para proteger o joelho',
    subtitulo: 'Conexão quadril-joelho',
    duracao: '4 min',
    categoria: 'tecnicas',
    conteudo: {
      introducao: 'Glúteos fracos ou inativos fazem com que o joelho assuma mais carga do que deveria. Quando os glúteos trabalham corretamente, eles controlam o movimento do fêmur, mantêm o joelho alinhado e distribuem melhor as forças. Aprender a ativar conscientemente os glúteos antes e durante os exercícios é uma habilidade essencial para proteger os joelhos.',
      pontosprincipais: [
        'Glúteos controlam posição do fêmur e alinhamento do joelho',
        'Fraqueza dos glúteos sobrecarrega o joelho',
        'Ativação consciente melhora padrão de movimento',
        'Exercícios específicos fortalecem e ativam glúteos'
      ],
      aplicacaoPratica: [
        'Faça pontes antes de agachamentos para ativar glúteos',
        'Sinta os glúteos trabalhando durante exercícios',
        'Use faixas elásticas para treinar ativação lateral',
        'Mantenha glúteos contraídos ao subir escadas'
      ]
    }
  },
  {
    id: 'distribuicao-peso-corporal',
    titulo: 'Distribuição do peso corporal',
    subtitulo: 'Equilíbrio e alinhamento',
    duracao: '4 min',
    categoria: 'tecnicas',
    conteudo: {
      introducao: 'A forma como você distribui seu peso durante movimentos afeta diretamente a pressão no joelho. Manter o peso nos calcanhares durante agachamentos, distribuir igualmente entre as duas pernas ao caminhar e evitar colocar peso excessivo na ponta dos pés são técnicas que reduzem significativamente a sobrecarga na patela.',
      pontosprincipais: [
        'Peso nos calcanhares reduz pressão na patela',
        'Distribuição igual entre pernas previne compensações',
        'Evitar ponta dos pés protege o joelho',
        'Consciência corporal melhora com prática'
      ],
      aplicacaoPratica: [
        'Pratique transferir peso para calcanhares em pé',
        'Sinta onde está o peso durante agachamentos',
        'Caminhe prestando atenção na distribuição do peso',
        'Use espelho para verificar alinhamento'
      ]
    }
  },
  {
    id: 'alinhamento-seguro',
    titulo: 'Alinhamento seguro',
    subtitulo: 'Posição correta do joelho',
    duracao: '4 min',
    categoria: 'tecnicas',
    conteudo: {
      introducao: 'O alinhamento correto do joelho durante movimentos é crucial para evitar dor. O joelho deve sempre apontar na mesma direção dos dedos dos pés. Quando o joelho "cai para dentro" (valgo), a pressão na patela aumenta drasticamente. Treinar o alinhamento correto conscientemente até se tornar automático é essencial.',
      pontosprincipais: [
        'Joelho deve apontar na mesma direção dos dedos dos pés',
        'Valgo (joelho para dentro) aumenta pressão na patela',
        'Alinhamento correto protege cartilagem',
        'Prática consciente cria padrão motor correto'
      ],
      aplicacaoPratica: [
        'Use espelho lateral para verificar alinhamento',
        'Pratique agachamentos lentos focando no alinhamento',
        'Fortaleça glúteos para manter joelhos alinhados',
        'Corrija imediatamente quando joelho entrar'
      ]
    }
  },
  {
    id: 'controle-na-descida',
    titulo: 'Controle na descida',
    subtitulo: 'Fase excêntrica protege o joelho',
    duracao: '4 min',
    categoria: 'tecnicas',
    conteudo: {
      introducao: 'A descida controlada em exercícios (fase excêntrica) é onde o joelho mais sofre pressão, mas também onde você mais ganha força. Descer lentamente, com controle total do movimento, fortalece os músculos de forma mais eficaz e protege a articulação. Muitas pessoas focam apenas na subida, mas a descida é igualmente importante.',
      pontosprincipais: [
        'Descida controlada fortalece mais que subida rápida',
        'Fase excêntrica desenvolve força e controle',
        'Descida lenta protege articulação de impactos',
        'Controle motor melhora com prática consciente'
      ],
      aplicacaoPratica: [
        'Conte 3-4 segundos na descida de cada exercício',
        'Mantenha tensão muscular durante toda descida',
        'Evite "cair" ou descer rápido demais',
        'Pratique descidas lentas em escadas também'
      ]
    }
  },
  {
    id: 'voltar-correr-seguranca',
    titulo: 'Voltar a correr com segurança',
    subtitulo: 'Progressão inteligente',
    duracao: '5 min',
    categoria: 'tecnicas',
    conteudo: {
      introducao: 'Voltar a correr após dor no joelho requer progressão cuidadosa. Começar com caminhadas, evoluir para trote leve intercalado com caminhada, e só então progredir para corrida contínua. A superfície importa: prefira grama ou terra a asfalto. A cadência (passos por minuto) também é crucial - passos mais curtos e rápidos reduzem impacto.',
      pontosprincipais: [
        'Comece com caminhada antes de correr',
        'Use método intervalado (caminhar + trotar)',
        'Superfícies macias reduzem impacto',
        'Cadência alta (170-180 passos/min) protege joelhos'
      ],
      aplicacaoPratica: [
        'Semana 1-2: apenas caminhada 20-30min',
        'Semana 3-4: 2min caminhada + 30s trote (repetir)',
        'Semana 5-6: 1min caminhada + 1min trote',
        'Aumente corrida apenas se não houver dor'
      ]
    }
  },

  // AVANÇADO
  {
    id: 'evitando-valgo',
    titulo: 'Evitando valgo',
    subtitulo: 'Joelho para dentro',
    duracao: '5 min',
    categoria: 'avancado',
    conteudo: {
      introducao: 'O valgo dinâmico (joelho caindo para dentro durante movimentos) é um dos principais causadores de dor patelofemoral. Acontece por fraqueza dos glúteos, especialmente glúteo médio, e falta de controle motor. Corrigir o valgo requer fortalecimento específico dos abdutores do quadril e treino consciente de padrão de movimento correto.',
      pontosprincipais: [
        'Valgo é causado por fraqueza de glúteo médio',
        'Aumenta drasticamente pressão na patela',
        'Comum em mulheres devido anatomia do quadril',
        'Correção requer fortalecimento + treino motor'
      ],
      aplicacaoPratica: [
        'Fortaleça glúteo médio com abdução lateral',
        'Use faixa elástica ao redor dos joelhos em agachamentos',
        'Pratique agachamentos unilaterais para identificar lado fraco',
        'Filme-se de frente para identificar valgo'
      ]
    }
  },
  {
    id: 'preparando-para-carga',
    titulo: 'Preparando para carga',
    subtitulo: 'Quando e como aumentar peso',
    duracao: '5 min',
    categoria: 'avancado',
    conteudo: {
      introducao: 'Adicionar carga aos exercícios deve ser feito apenas quando você consegue realizar o movimento com técnica perfeita, sem dor, e com controle total. A progressão deve ser gradual: primeiro aumente repetições, depois séries, e só então adicione peso. Começar com 2-3kg e aumentar 1-2kg por semana é uma progressão segura para a maioria das pessoas.',
      pontosprincipais: [
        'Técnica perfeita vem antes de adicionar peso',
        'Progrida: repetições → séries → carga',
        'Aumente peso gradualmente (1-2kg por semana)',
        'Dor é sinal para reduzir carga, não ignorar'
      ],
      aplicacaoPratica: [
        'Domine 3x15 repetições sem peso antes de adicionar carga',
        'Comece com halteres leves (2-3kg)',
        'Se sentir dor, volte para peso anterior',
        'Mantenha forma perfeita mesmo com fadiga'
      ]
    }
  },
  {
    id: 'estabilidade-durante-treinos',
    titulo: 'Estabilidade durante treinos',
    subtitulo: 'Controle em exercícios complexos',
    duracao: '5 min',
    categoria: 'avancado',
    conteudo: {
      introducao: 'Manter estabilidade durante exercícios complexos ou com carga requer força de core, controle proprioceptivo e coordenação muscular. Exercícios unilaterais (uma perna só) são excelentes para desenvolver estabilidade. Treinar em superfícies instáveis (como bosu) pode ajudar, mas só após dominar movimentos em solo firme.',
      pontosprincipais: [
        'Estabilidade requer força de core e propriocepção',
        'Exercícios unilaterais desenvolvem controle',
        'Superfícies instáveis são avançadas',
        'Estabilidade previne lesões em treinos intensos'
      ],
      aplicacaoPratica: [
        'Inclua prancha e exercícios de core na rotina',
        'Pratique agachamentos e lunges unilaterais',
        'Treine equilíbrio em uma perna (30-60s)',
        'Use superfícies instáveis apenas se dominar solo firme'
      ]
    }
  },
  {
    id: 'resiliencia-articular',
    titulo: 'Resiliência articular',
    subtitulo: 'Construindo joelhos resistentes',
    duracao: '5 min',
    categoria: 'avancado',
    conteudo: {
      introducao: 'Resiliência articular é a capacidade do joelho de suportar estresse sem se lesionar. Construir resiliência requer exposição gradual a cargas progressivas, variedade de movimentos, recuperação adequada e nutrição apropriada. Joelhos resilientes não são apenas fortes, mas também adaptáveis e capazes de se recuperar rapidamente de estresse.',
      pontosprincipais: [
        'Resiliência = capacidade de suportar estresse sem lesão',
        'Requer progressão gradual e variedade de estímulos',
        'Recuperação adequada é essencial',
        'Nutrição e hidratação afetam saúde articular'
      ],
      aplicacaoPratica: [
        'Varie tipos de exercícios e ângulos de movimento',
        'Respeite dias de descanso (2-3x por semana treino)',
        'Consuma proteína adequada para recuperação',
        'Mantenha hidratação para saúde da cartilagem'
      ]
    }
  },
  {
    id: 'evitando-recidiva',
    titulo: 'Evitando recidiva',
    subtitulo: 'Como não voltar a ter dor',
    duracao: '5 min',
    categoria: 'avancado',
    conteudo: {
      introducao: 'Muitas pessoas melhoram da dor mas voltam a sentir sintomas ao retomar atividades normais. Evitar recidiva requer manter exercícios de fortalecimento mesmo após melhora, progredir atividades gradualmente, manter técnica correta e estar atento aos primeiros sinais de sobrecarga. Prevenção é mais fácil que tratamento.',
      pontosprincipais: [
        'Manutenção de exercícios previne recidiva',
        'Não pare exercícios quando dor melhorar',
        'Progressão gradual em novas atividades',
        'Atenção aos primeiros sinais de sobrecarga'
      ],
      aplicacaoPratica: [
        'Mantenha 2-3x/semana exercícios de fortalecimento',
        'Aumente atividades novas gradualmente (10% por semana)',
        'Ao sentir desconforto, reduza intensidade imediatamente',
        'Faça "check-ups" mensais de força e técnica'
      ]
    }
  },
  {
    id: 'joelho-mais-resistente',
    titulo: 'Joelho mais resistente',
    subtitulo: 'Adaptações de longo prazo',
    duracao: '5 min',
    categoria: 'avancado',
    conteudo: {
      introducao: 'Construir um joelho verdadeiramente resistente leva meses de trabalho consistente. As adaptações incluem aumento da densidade óssea, fortalecimento de tendões e ligamentos, melhora da vascularização e otimização de padrões motores. Essas mudanças acontecem lentamente, mas são duradouras quando construídas corretamente.',
      pontosprincipais: [
        'Adaptações estruturais levam 3-6 meses',
        'Consistência é mais importante que intensidade',
        'Tendões e ligamentos fortalecem mais lentamente que músculos',
        'Padrões motores corretos se tornam automáticos'
      ],
      aplicacaoPratica: [
        'Mantenha rotina consistente por pelo menos 3 meses',
        'Não apresse progressão - respeite tempo de adaptação',
        'Varie estímulos mas mantenha exercícios base',
        'Celebre pequenos progressos - são sinais de adaptação'
      ]
    }
  },

  // ESTILO DE VIDA
  {
    id: 'quando-posso-correr',
    titulo: 'Quando posso correr?',
    subtitulo: 'Critérios para retorno',
    duracao: '4 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'Você está pronto para correr quando consegue caminhar 30 minutos sem dor, fazer agachamentos unilaterais com boa técnica, subir e descer escadas normalmente, e realizar saltos baixos sem desconforto. Além disso, deve ter pelo menos 4-6 semanas de fortalecimento consistente. Apressar o retorno à corrida é a principal causa de recidiva.',
      pontosprincipais: [
        'Caminhar 30min sem dor é pré-requisito',
        'Agachamento unilateral indica força suficiente',
        'Mínimo 4-6 semanas de fortalecimento',
        'Começar devagar previne recidiva'
      ],
      aplicacaoPratica: [
        'Teste: 10 agachamentos unilaterais sem dor',
        'Teste: subir 3 lances de escada sem desconforto',
        'Teste: 10 saltos baixos no lugar sem dor',
        'Se passar nos testes, comece com trote leve intervalado'
      ]
    }
  },
  {
    id: 'cadencia-corrida',
    titulo: 'Cadência ideal',
    subtitulo: 'Passos por minuto',
    duracao: '4 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'A cadência ideal para corredores está entre 170-180 passos por minuto. Cadência mais alta significa passos mais curtos e rápidos, o que reduz o impacto em cada aterrissagem e diminui a sobrecarga no joelho. Muitos corredores com dor no joelho correm com cadência baixa (150-160), o que aumenta o tempo de contato com o solo e o impacto.',
      pontosprincipais: [
        'Cadência ideal: 170-180 passos por minuto',
        'Passos curtos e rápidos reduzem impacto',
        'Cadência baixa aumenta sobrecarga no joelho',
        'Ajustar cadência leva tempo e prática'
      ],
      aplicacaoPratica: [
        'Use metrônomo ou música com BPM adequado',
        'Conte passos durante 1 minuto de corrida',
        'Aumente cadência gradualmente (5 passos/min por semana)',
        'Foque em passos leves e rápidos, não longos'
      ]
    }
  },
  {
    id: 'respiracao-corrida',
    titulo: 'Respiração',
    subtitulo: 'Técnica respiratória na corrida',
    duracao: '3 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'Respiração adequada durante a corrida melhora performance e reduz fadiga. O padrão 3:2 (inspirar por 3 passos, expirar por 2) é eficaz para corrida moderada. Respirar pelo nariz e boca simultaneamente maximiza entrada de oxigênio. Respiração ritmada também ajuda a manter cadência constante.',
      pontosprincipais: [
        'Padrão 3:2 é eficaz para corrida moderada',
        'Respire pelo nariz e boca simultaneamente',
        'Respiração ritmada ajuda manter cadência',
        'Expiração completa é tão importante quanto inspiração'
      ],
      aplicacaoPratica: [
        'Pratique padrão 3:2 em caminhadas primeiro',
        'Não prenda a respiração - mantenha fluxo constante',
        'Se ficar ofegante, reduza ritmo da corrida',
        'Respiração deve ser natural, não forçada'
      ]
    }
  },
  {
    id: 'evitando-canelite',
    titulo: 'Evitando canelite',
    subtitulo: 'Prevenção de dor na canela',
    duracao: '4 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'Canelite (dor na parte frontal da canela) é comum em corredores iniciantes. Causada por sobrecarga dos músculos da canela, geralmente por aumentar volume ou intensidade rápido demais, correr em superfícies duras ou usar tênis inadequados. Prevenção inclui progressão gradual, fortalecimento específico e escolha correta de calçado.',
      pontosprincipais: [
        'Causada por sobrecarga e progressão rápida demais',
        'Superfícies duras e tênis inadequados aumentam risco',
        'Fortalecimento de panturrilha e tibial anterior previne',
        'Progressão gradual é essencial (regra dos 10%)'
      ],
      aplicacaoPratica: [
        'Aumente distância máximo 10% por semana',
        'Fortaleça panturrilha e tibial anterior regularmente',
        'Use tênis com amortecimento adequado',
        'Varie superfícies - inclua grama e terra'
      ]
    }
  },
  {
    id: 'velocidade-nao-importa',
    titulo: 'Velocidade não importa',
    subtitulo: 'Foco em consistência',
    duracao: '3 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'Para iniciantes e pessoas com histórico de dor no joelho, velocidade não deve ser prioridade. O importante é construir base aeróbica, fortalecer estruturas e criar hábito consistente. Correr devagar permite manter boa técnica, reduz risco de lesão e torna o exercício sustentável a longo prazo. Velocidade virá naturalmente com o tempo.',
      pontosprincipais: [
        'Velocidade não é prioridade para iniciantes',
        'Correr devagar permite manter boa técnica',
        'Consistência é mais importante que intensidade',
        'Base aeróbica sólida previne lesões'
      ],
      aplicacaoPratica: [
        'Mantenha ritmo confortável - deve conseguir conversar',
        'Não compare seu ritmo com outros corredores',
        'Foque em completar distância, não em tempo',
        'Velocidade aumentará naturalmente após 3-6 meses'
      ]
    }
  },
  {
    id: 'ajustes-de-ritmo',
    titulo: 'Ajustes de ritmo',
    subtitulo: 'Ouvindo seu corpo',
    duracao: '4 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'Saber quando acelerar, manter ou reduzir o ritmo é habilidade essencial. Dias de mais energia permitem ritmo mais forte, dias de fadiga requerem ritmo mais leve. Dor ou desconforto são sinais claros para reduzir. Não existe treino "ruim" - ajustar ritmo conforme necessário é inteligência, não fraqueza.',
      pontosprincipais: [
        'Ajuste ritmo conforme energia do dia',
        'Dor é sinal claro para reduzir intensidade',
        'Treino leve é melhor que treino forçado',
        'Flexibilidade previne lesões e burnout'
      ],
      aplicacaoPratica: [
        'Avalie energia antes de cada treino (escala 1-10)',
        'Se energia <6, reduza intensidade planejada',
        'Ao sentir dor, reduza para caminhada imediatamente',
        'Não siga plano rigidamente - adapte conforme necessário'
      ]
    }
  },
  {
    id: 'voce-e-um-corredor',
    titulo: 'Você é um corredor',
    subtitulo: 'Mentalidade e identidade',
    duracao: '3 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'Você não precisa correr maratonas ou ser rápido para se considerar corredor. Se você corre regularmente, mesmo que devagar ou por curtas distâncias, você é um corredor. Abraçar essa identidade fortalece compromisso, aumenta motivação e torna mais fácil manter consistência. Velocidade e distância são secundárias.',
      pontosprincipais: [
        'Corredor é quem corre regularmente, não quem corre rápido',
        'Identidade fortalece compromisso e motivação',
        'Comparação com outros é desnecessária',
        'Seu progresso pessoal é o que importa'
      ],
      aplicacaoPratica: [
        'Chame-se de corredor, mesmo correndo devagar',
        'Celebre cada corrida completada, independente de ritmo',
        'Conecte-se com comunidade de corredores',
        'Foque em seu próprio progresso, não em comparações'
      ]
    }
  },
  {
    id: 'mantendo-corrida-sem-dor',
    titulo: 'Como manter joelhos saudáveis',
    subtitulo: 'Estratégias de longo prazo',
    duracao: '5 min',
    categoria: 'estilo-vida',
    conteudo: {
      introducao: 'Manter joelhos saudáveis a longo prazo requer equilíbrio entre treino, recuperação e prevenção. Continue exercícios de fortalecimento mesmo sem dor, varie atividades para evitar sobrecarga repetitiva, mantenha peso corporal saudável e esteja atento aos primeiros sinais de sobrecarga. Prevenção é investimento que compensa.',
      pontosprincipais: [
        'Mantenha fortalecimento mesmo sem dor',
        'Varie atividades para evitar sobrecarga repetitiva',
        'Peso corporal saudável reduz estresse articular',
        'Atenção precoce a sinais previne lesões maiores'
      ],
      aplicacaoPratica: [
        'Reserve 2-3x/semana para fortalecimento',
        'Alterne corrida com outras atividades (natação, bike)',
        'Monitore peso e ajuste alimentação se necessário',
        'Ao primeiro sinal de desconforto, reduza volume 20-30%'
      ]
    }
  }
];

export const categorias = {
  'fundamentos': {
    nome: 'Fundamentos',
    descricao: 'Entenda sua dor e os conceitos básicos'
  },
  'tecnicas': {
    nome: 'Técnicas',
    descricao: 'Aprenda a se movimentar corretamente'
  },
  'avancado': {
    nome: 'Avançado',
    descricao: 'Conceitos para progressão segura'
  },
  'estilo-vida': {
    nome: 'Estilo de Vida',
    descricao: 'Hábitos para manter joelhos saudáveis'
  }
};

// Mapeamento de trilhas para aulas recomendadas
export const recomendacoesPorTrilha: Record<string, string> = {
  'condromalacia': 'o-que-piora-a-dor',
  'agachar': 'como-agachar-certo',
  'escadas': 'o-que-e-condromalacia',
  'sobrepeso-joelho': 'peso-e-joelho',
  'volta-treinos': 'como-agachar-certo',
  'corrida-iniciante': 'voltar-correr-seguranca'
};

// Mapeamento de aulas recomendadas por dia de cada trilha
export const aulasRecomendadasPorDia: Record<string, Record<number, string>> = {
  'condromalacia': {
    1: 'o-que-e-condromalacia',
    2: 'ativando-gluteos',
    3: 'importancia-quadriceps',
    4: 'como-agachar-certo',
    5: 'distribuicao-peso-corporal',
    6: 'movimento-como-alivio',
    8: 'ativando-gluteos',
    10: 'alinhamento-seguro',
    12: 'o-que-piora-a-dor',
    15: 'como-agachar-certo',
    18: 'controle-na-descida',
    21: 'evitando-recidiva'
  },
  'sobrepeso-joelho': {
    1: 'peso-e-joelho',
    2: 'ativando-gluteos',
    3: 'importancia-quadriceps',
    4: 'como-agachar-certo',
    5: 'distribuicao-peso-corporal',
    6: 'movimento-como-alivio',
    8: 'ativando-gluteos',
    10: 'alinhamento-seguro',
    12: 'o-que-piora-a-dor',
    15: 'como-agachar-certo',
    18: 'controle-na-descida',
    21: 'mantendo-corrida-sem-dor'
  },
  'volta-treinos': {
    1: 'importancia-quadriceps',
    4: 'como-agachar-certo',
    8: 'ativando-gluteos',
    10: 'distribuicao-peso-corporal',
    12: 'preparando-para-carga',
    15: 'como-agachar-certo',
    17: 'evitando-valgo',
    18: 'preparando-para-carga',
    19: 'estabilidade-durante-treinos',
    22: 'controle-na-descida',
    25: 'resiliencia-articular',
    28: 'mantendo-corrida-sem-dor'
  },
  'corrida-iniciante': {
    1: 'movimento-como-alivio',
    6: 'quando-posso-correr',
    8: 'voltar-correr-seguranca',
    9: 'cadencia-corrida',
    11: 'voltar-correr-seguranca',
    15: 'voltar-correr-seguranca',
    19: 'respiracao-corrida',
    22: 'voltar-correr-seguranca',
    25: 'evitando-canelite',
    26: 'velocidade-nao-importa',
    29: 'voce-e-um-corredor',
    30: 'mantendo-corrida-sem-dor'
  }
};
