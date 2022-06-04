
exports.seed = function(knex) {
  return knex('achievements').del()
    .then(() => {
      const types_evaluations = [
        {id: 'AP5', description: 'Adicione 5 locais', category: 'place', actions_amount: 5},
        {id: 'AP25', description: 'Adicione 25 locais', category: 'place', actions_amount: 25},
        // {id: 'AP25', description: 'Adicione 50 locais', category: 'place'},
        // {id: 'AP50', description: 'Adicione 75 locais', category: 'place'},
        // {id: 'AP100', description: 'Adicione 100 locais', category: 'place'},

        {id: 'AW1', description: 'Adicione 10 vagas para cadeirante', category: 'wheelchair_parking', actions_amount: 10},
        {id: 'AW20', description: 'Adicione 20 vagas para cadeirante', category: 'wheelchair_parking', actions_amount: 20},
        // {id: 'AW50', description: 'Adicione 30 Vaga para Cadeirante', category: 'wheelchair_parking'},
        // {id: 'AW100', description: 'Adicione 50 Vaga para Cadeirante', category: 'wheelchair_parking'},
        // {id: 'AW200', description: 'Adicione 100 Vaga para Cadeirante', category: 'wheelchair_parking'},
      ];

      const places_category = [
         {id: 'APTL1', description: 'Adicione 1 avaliação na categoria de viagem', category: 'travel', actions_amount: 1},
         {id: 'APTL10', description: 'Adicione 10 avaliações na categoria de viagem', category: 'travel', actions_amount: 10},
        //  {id: 'APTL10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'travel'},
        //  {id: 'APTL25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'travel'},
        //  {id: 'APTL50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'travel'},
        //  {id: 'APTL100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'travel'},

         {id: 'APTT1', description: 'Adicione 1 avaliação na categoria de transporte', category: 'transport', actions_amount: 1},
         {id: 'APTT10', description: 'Adicione 10 avaliações na categoria de transporte', category: 'transport', actions_amount: 10},
        //  {id: 'APTT10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'transport'},
        //  {id: 'APTT25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'transport'},
        //  {id: 'APTT50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'transport'},
        //  {id: 'APTT100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'transport'},

         {id: 'APST1', description: 'Adicione 1 avaliação na categoria de supermercado', category: 'supermarket', actions_amount: 1},
         {id: 'APST10', description: 'Adicione 10 avaliações na categoria de supermercado', category: 'supermarket', actions_amount: 10},
        //  {id: 'APST10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'supermarket'},
        //  {id: 'APST25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'supermarket'},
        //  {id: 'APST50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'supermarket'},
        //  {id: 'APST100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'supermarket'},

         {id: 'APSS1', description: 'Adicione 1 avaliação na categoria de serviços', category: 'services', actions_amount: 1},
         {id: 'APSS10', description: 'Adicione 10 avaliações na categoria de serviços', category: 'services', actions_amount: 10},
        //  {id: 'APSS10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'services'},
        //  {id: 'APSS25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'services'},
        //  {id: 'APSS50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'services'},
        //  {id: 'APSS100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'services'},
         
         {id: 'APL1', description: 'Adicione 1 avaliação na categoria de lazer', category: 'leisure', actions_amount: 1},
         {id: 'APL10', description: 'Adicione 10 avaliações na categoria de lazer', category: 'leisure', actions_amount: 10},
        //  {id: 'APL10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'leisure'},
        //  {id: 'APL25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'leisure'},
        //  {id: 'APL50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'leisure'},
        //  {id: 'APL100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'leisure'},
         
         {id: 'APE1', description: 'Adicione 1 avaliação na categoria de educação', category: 'education', actions_amount: 1},
         {id: 'APE10', description: 'Adicione 10 avaliações na categoria de educação', category: 'education', actions_amount: 10},
        //  {id: 'APE10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'education'},
        //  {id: 'APE25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'education'},
        //  {id: 'APE50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'education'},
        //  {id: 'APE100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'education'},
        
         {id: 'APFD1', description: 'Adicione 1 avaliação na categoria de alimentos', category: 'food', actions_amount: 1},
         {id: 'APFD10', description: 'Adicione 10 avaliações na categoria de alimentos', category: 'food', actions_amount: 10},
        //  {id: 'APFD10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'food'},
        //  {id: 'APFD25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'food'},
        //  {id: 'APFD50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'food'},
        //  {id: 'APFD100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'food'},
        
         {id: 'APH1', description: 'Adicione 1 avaliação na categoria de hospitais', category: 'hospital', actions_amount: 1},
         {id: 'APH10', description: 'Adicione 10 avaliações na categoria de hospitais', category: 'hospital', actions_amount: 10},
        //  {id: 'APH10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'hospital'},
        //  {id: 'APH25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'hospital'},
        //  {id: 'APH50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'hospital'},
        //  {id: 'APH100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'hospital'},
        
         {id: 'APAN1', description: 'Adicione 1 avaliação na categoria de hospedagem', category: 'accommodation', actions_amount: 1},
         {id: 'APAN10', description: 'Adicione 10 avaliações na categoria de hospedagem', category: 'accommodation', actions_amount: 10},
        //  {id: 'APAN10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'accommodation'},
        //  {id: 'APAN25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'accommodation'},
        //  {id: 'APAN50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'accommodation'},
        //  {id: 'APAN100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'accommodation'},
         
         {id: 'APFN1', description: 'Adicione 1 avaliação na categoria de financias', category: 'finance', actions_amount: 1},
         {id: 'APFN10', description: 'Adicione 10 avaliações na categoria de financias', category: 'finance', actions_amount: 10},
        //  {id: 'APFN10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'finance'},
        //  {id: 'APFN25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'finance'},
        //  {id: 'APFN50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'finance'},
        //  {id: 'APFN100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'finance'},
      ];

      const place_classify = [
        {id: 'APAE1', description: 'Adicione 1 local acessível', category: 'accessible_place', actions_amount: 1},
        {id: 'APAE5', description: 'Adicione 5 locais acessíveis', category: 'accessible_place', actions_amount: 5},
        // {id: 'APAE25', description: 'Adicione 1 local', category: 'accessible_place'},
        // {id: 'APAE50', description: 'Adicione 1 local', category: 'accessible_place'},
        // {id: 'APAE100', description: 'Adicione 1 local', category: 'accessible_place'},
        
        {id: 'APPA1', description: 'Adicione 1 local parcialmente acessível', category: 'partially_accessible_place', actions_amount: 1},
        {id: 'APPA5', description: 'Adicione 5 locais parcialmente acessíveis', category: 'partially_accessible_place', actions_amount: 5},
        // {id: 'APPA25', description: 'Adicione 1 local', category: 'partially_accessible_place'},
        // {id: 'APPA50', description: 'Adicione 1 local', category: 'partially_accessible_place'},
        // {id: 'APPA100', description: 'Adicione 1 local', category: 'partially_accessible_place'},
        
        {id: 'APNA1', description: 'Adicione 1 local não acessível', category: 'not_accessible_place', actions_amount: 1},
        {id: 'APNA5', description: 'Adicione 5 locais não acessíveis', category: 'not_accessible_place', actions_amount: 5},
        // {id: 'APNA25', description: 'Adicione 1 local', category: 'not_accessible_place'},
        // {id: 'APNA50', description: 'Adicione 1 local', category: 'not_accessible_place'},
        // {id: 'APNA100', description: 'Adicione 1 local', category: 'not_accessible_place'},
      ];

      const space_types = [
        {id: 'APLE1', description: 'Adicione 1 avaliação de local público', category: 'public_evaluations', actions_amount: 1},
        {id: 'APLE5', description: 'Adicione 5 avaliações de local público', category: 'public_evaluations', actions_amount: 5},
        // {id: 'APAE25', description: 'Adicione 1 local', category: 'public_evaluations'},
        // {id: 'APAE50', description: 'Adicione 1 local', category: 'public_evaluations'},
        // {id: 'APAE100', description: 'Adicione 1 local', category: 'public_evaluations'},

        {id: 'APRE1', description: 'Adicione 1 avaliação de um local privado', category: 'private_evaluations', actions_amount: 1},
        {id: 'APRE5', description: 'Adicione 5 avaliações de um local privado', category: 'private_evaluations', actions_amount: 5},
        // {id: 'APAE25', description: 'Adicione 1 local', category: 'private_evaluations'},
        // {id: 'APAE50', description: 'Adicione 1 local', category: 'private_evaluations'},
        // {id: 'APAE100', description: 'Adicione 1 local', category: 'private_evaluations'},
      ];

      const gamification = [
        {id: 'APO1', description: 'Obtenha 50 pontos', category: 'points', actions_amount: 50},
        {id: 'APO6000', description: 'Obtenha 6000 pontos', category: 'points', actions_amount: 6000},
        // {id: 'APO25', description: 'Adicione 1 local', category: 'points'},
        // {id: 'APO50', description: 'Adicione 1 local', category: 'points'},
        // {id: 'APO100', description: 'Adicione 1 local', category: 'points'},

        // {id: 'AWP1', description: 'Adicione 1 local', category: 'weekly_points', actions_amount: 1},
        // {id: 'AWP5', description: 'Adicione 1 local', category: 'weekly_points', actions_amount: 5},
        // {id: 'AWP25', description: 'Adicione 1 local', category: 'weekly_points'},
        // {id: 'AWP50', description: 'Adicione 1 local', category: 'weekly_points'},
        // {id: 'AWP100', description: 'Adicione 1 local', category: 'weekly_points'},
        
        {id: 'AL5', description: 'Alacance o nível 5', category: 'level', actions_amount: 5},
        {id: 'AL10', description: 'Alcance o nível 10', category: 'level', actions_amount: 10},
        // {id: 'AWP25', description: 'Adicione 1 local', category: 'level'},
        // {id: 'AWP50', description: 'Adicione 1 local', category: 'level'},
        // {id: 'AWP100', description: 'Adicione 1 local', category: 'level'},
      ];

      const actions = [
        {id: 'AA1', description: 'Adicione 1 marcação', category: 'marking', actions_amount: 1},
        {id: 'AA5', description: 'Adicione 5 marcações', category: 'marking', actions_amount: 5},
        // {id: 'AE25', description: 'Adicione 1 local', category: 'marking'},
        // {id: 'AE50', description: 'Adicione 1 local', category: 'marking'},
        // {id: 'AE100', description: 'Adicione 1 local', category: 'marking'},

        {id: 'AEE1', description: 'Atualize 1 avaliação de local', category: 'edit_evaluations', actions_amount: 1},
        {id: 'AEE5', description: 'Atualize 5 avaliações de local', category: 'edit_evaluations', actions_amount: 5},
        // {id: 'AEE25', description: 'Adicione 1 local', category: 'edit_evaluations'},
        // {id: 'AEE50', description: 'Adicione 1 local', category: 'edit_evaluations'},
        // {id: 'AEE100', description: 'Adicione 1 local', category: 'edit_evaluations'},
        
        {id: 'AC1', description: 'Adicione 1 comentário', category: 'comments', actions_amount: 1},
        {id: 'AC5', description: 'Adicione 5 comentários', category: 'comments', actions_amount: 5},
        // {id: 'AEE25', description: 'Adicione 1 local', category: 'comments'},
        // {id: 'AEE50', description: 'Adicione 1 local', category: 'comments'},
        // {id: 'AEE100', description: 'Adicione 1 local', category: 'comments'},
      ];
      
      return knex('achievements').insert([
        ...types_evaluations,
        ...places_category,
        ...place_classify,
        ...space_types,
        ...gamification,
        ...actions,
      ]);
    });
};
