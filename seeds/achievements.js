
exports.seed = function(knex) {
  return knex('achievements').del()
    .then(() => {
      const types_evaluations = [
        {id: 'AP5', description: 'Adicione 5 lugares', category: 'place', actions_amount: 5},
        {id: 'AP10', description: 'Adicione 25 lugares', category: 'place', actions_amount: 10},
        // {id: 'AP25', description: 'Adicione 50 lugares', category: 'place'},
        // {id: 'AP50', description: 'Adicione 75 lugares', category: 'place'},
        // {id: 'AP100', description: 'Adicione 100 lugares', category: 'place'},

        {id: 'AW1', description: 'Adicione 10 Vaga para Cadeirante', category: 'wheelchair_parking', actions_amount: 1},
        {id: 'AW20', description: 'Adicione 20 Vaga para Cadeirante', category: 'wheelchair_parking', actions_amount: 20},
        // {id: 'AW50', description: 'Adicione 30 Vaga para Cadeirante', category: 'wheelchair_parking'},
        // {id: 'AW100', description: 'Adicione 50 Vaga para Cadeirante', category: 'wheelchair_parking'},
        // {id: 'AW200', description: 'Adicione 100 Vaga para Cadeirante', category: 'wheelchair_parking'},
      ];

      const places_category = [
         {id: 'APTL1', description: 'Adicione 1 Avaliação na categoria de viagem', category: 'travel', actions_amount: 1},
         {id: 'APTL5', description: 'Adicione 10 Avaliação na categoria de viagem', category: 'travel', actions_amount: 5},
        //  {id: 'APTL10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'travel'},
        //  {id: 'APTL25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'travel'},
        //  {id: 'APTL50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'travel'},
        //  {id: 'APTL100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'travel'},

         {id: 'APTT1', description: 'Adicione 1 Avaliação na categoria de transporte', category: 'transport', actions_amount: 1},
         {id: 'APTT5', description: 'Adicione 10 Avaliação na categoria de transporte', category: 'transport', actions_amount: 5},
        //  {id: 'APTT10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'transport'},
        //  {id: 'APTT25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'transport'},
        //  {id: 'APTT50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'transport'},
        //  {id: 'APTT100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'transport'},

         {id: 'APST1', description: 'Adicione 1 Avaliação na categoria de supermercado', category: 'supermarket', actions_amount: 1},
         {id: 'APST5', description: 'Adicione 10 Avaliação na categoria de supermercado', category: 'supermarket', actions_amount: 5},
        //  {id: 'APST10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'supermarket'},
        //  {id: 'APST25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'supermarket'},
        //  {id: 'APST50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'supermarket'},
        //  {id: 'APST100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'supermarket'},

         {id: 'APSS1', description: 'Adicione 1 Avaliação na categoria de serviços', category: 'services', actions_amount: 1},
         {id: 'APSS5', description: 'Adicione 10 Avaliação na categoria de serviços', category: 'services', actions_amount: 5},
        //  {id: 'APSS10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'services'},
        //  {id: 'APSS25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'services'},
        //  {id: 'APSS50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'services'},
        //  {id: 'APSS100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'services'},
         
         {id: 'APL1', description: 'Adicione 1 Avaliação na categoria de lazer', category: 'leisure', actions_amount: 1},
         {id: 'APL5', description: 'Adicione 10 Avaliação na categoria de lazer', category: 'leisure', actions_amount: 5},
        //  {id: 'APL10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'leisure'},
        //  {id: 'APL25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'leisure'},
        //  {id: 'APL50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'leisure'},
        //  {id: 'APL100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'leisure'},
         
         {id: 'APE1', description: 'Adicione 1 Avaliação na categoria de educação', category: 'education', actions_amount: 1},
         {id: 'APE5', description: 'Adicione 10 Avaliação na categoria de educação', category: 'education', actions_amount: 5},
        //  {id: 'APE10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'education'},
        //  {id: 'APE25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'education'},
        //  {id: 'APE50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'education'},
        //  {id: 'APE100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'education'},
        
         {id: 'APFD1', description: 'Adicione 1 Avaliação na categoria de alimentos', category: 'food', actions_amount: 1},
         {id: 'APFD5', description: 'Adicione 10 Avaliação na categoria de alimentos', category: 'food', actions_amount: 5},
        //  {id: 'APFD10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'food'},
        //  {id: 'APFD25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'food'},
        //  {id: 'APFD50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'food'},
        //  {id: 'APFD100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'food'},
        
         {id: 'APH1', description: 'Adicione 1 Avaliação na categoria de hospitais', category: 'hospital', actions_amount: 1},
         {id: 'APH5', description: 'Adicione 10 Avaliação na categoria de hospitais', category: 'hospital', actions_amount: 5},
        //  {id: 'APH10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'hospital'},
        //  {id: 'APH25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'hospital'},
        //  {id: 'APH50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'hospital'},
        //  {id: 'APH100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'hospital'},
        
         {id: 'APAN1', description: 'Adicione 1 Avaliação na categoria de hospedagem', category: 'accomodation', actions_amount: 1},
         {id: 'APAN5', description: 'Adicione 10 Avaliação na categoria de hospedagem', category: 'accomodation', actions_amount: 5},
        //  {id: 'APAN10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'accomodation'},
        //  {id: 'APAN25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'accomodation'},
        //  {id: 'APAN50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'accomodation'},
        //  {id: 'APAN100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'accomodation'},
         
         {id: 'APFN1', description: 'Adicione 1 Avaliação na categoria de financias', category: 'finance', actions_amount: 1},
         {id: 'APFN5', description: 'Adicione 10 Avaliação na categoria de financias', category: 'finance', actions_amount: 5},
        //  {id: 'APFN10', description: 'Adicione 25 Avaliação na categoria de Viagem', category: 'finance'},
        //  {id: 'APFN25', description: 'Adicione 50 Avaliação na categoria de Viagem', category: 'finance'},
        //  {id: 'APFN50', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'finance'},
        //  {id: 'APFN100', description: 'Adicione 100 Avaliação na categoria de Viagem', category: 'finance'},
      ];

      const place_classify = [
        {id: 'APAE1', description: 'Adicione 1 lugar acessível', category: 'accessible_place', actions_amount: 1},
        {id: 'APAE5', description: 'Adicione 5 lugares acessíveis', category: 'accessible_place', actions_amount: 5},
        // {id: 'APAE25', description: 'Adicione 1 lugar', category: 'accessible_place'},
        // {id: 'APAE50', description: 'Adicione 1 lugar', category: 'accessible_place'},
        // {id: 'APAE100', description: 'Adicione 1 lugar', category: 'accessible_place'},
        
        {id: 'APPA1', description: 'Adicione 1 lugar parcialmente acessível', category: 'partially_accessible_place', actions_amount: 1},
        {id: 'APPA5', description: 'Adicione 5 lugares parcialmente acessíveis', category: 'partially_accessible_place', actions_amount: 5},
        // {id: 'APPA25', description: 'Adicione 1 lugar', category: 'partially_accessible_place'},
        // {id: 'APPA50', description: 'Adicione 1 lugar', category: 'partially_accessible_place'},
        // {id: 'APPA100', description: 'Adicione 1 lugar', category: 'partially_accessible_place'},
        
        {id: 'APNA1', description: 'Adicione 1 lugar não acessível', category: 'not_accessible_place', actions_amount: 1},
        {id: 'APNA5', description: 'Adicione 5 lugares não acessíveis', category: 'not_accessible_place', actions_amount: 5},
        // {id: 'APNA25', description: 'Adicione 1 lugar', category: 'not_accessible_place'},
        // {id: 'APNA50', description: 'Adicione 1 lugar', category: 'not_accessible_place'},
        // {id: 'APNA100', description: 'Adicione 1 lugar', category: 'not_accessible_place'},
      ];

      const space_types = [
        {id: 'APLE1', description: 'Adicione 1 avaliação de um lugar público', category: 'public_evaluations', actions_amount: 1},
        {id: 'APLE5', description: 'Adicione 1 avaliação de um lugar público', category: 'public_evaluations', actions_amount: 5},
        // {id: 'APAE25', description: 'Adicione 1 lugar', category: 'public_evaluations'},
        // {id: 'APAE50', description: 'Adicione 1 lugar', category: 'public_evaluations'},
        // {id: 'APAE100', description: 'Adicione 1 lugar', category: 'public_evaluations'},

        {id: 'APRE1', description: 'Adicione 1 avaliação de um lugar privado', category: 'private_evaluations', actions_amount: 1},
        {id: 'APRE5', description: 'Adicione 5 avaliações de um lugar privado', category: 'private_evaluations', actions_amount: 5},
        // {id: 'APAE25', description: 'Adicione 1 lugar', category: 'private_evaluations'},
        // {id: 'APAE50', description: 'Adicione 1 lugar', category: 'private_evaluations'},
        // {id: 'APAE100', description: 'Adicione 1 lugar', category: 'private_evaluations'},
      ];

      const gamification = [
        {id: 'APO1', description: 'Alance 50 pontos', category: 'points', actions_amount: 50},
        {id: 'APO5', description: 'Alacance 6000 pontos', category: 'points', actions_amount: 6000},
        // {id: 'APO25', description: 'Adicione 1 lugar', category: 'points'},
        // {id: 'APO50', description: 'Adicione 1 lugar', category: 'points'},
        // {id: 'APO100', description: 'Adicione 1 lugar', category: 'points'},

        // {id: 'AWP1', description: 'Adicione 1 lugar', category: 'weekly_points', actions_amount: 1},
        // {id: 'AWP5', description: 'Adicione 1 lugar', category: 'weekly_points', actions_amount: 5},
        // {id: 'AWP25', description: 'Adicione 1 lugar', category: 'weekly_points'},
        // {id: 'AWP50', description: 'Adicione 1 lugar', category: 'weekly_points'},
        // {id: 'AWP100', description: 'Adicione 1 lugar', category: 'weekly_points'},
        
        {id: 'AL1', description: 'Alacance o nível 1', category: 'level', actions_amount: 1},
        {id: 'AL5', description: 'Alcance o nível 5', category: 'level', actions_amount: 5},
        // {id: 'AWP25', description: 'Adicione 1 lugar', category: 'level'},
        // {id: 'AWP50', description: 'Adicione 1 lugar', category: 'level'},
        // {id: 'AWP100', description: 'Adicione 1 lugar', category: 'level'},
      ];

      const actions = [
        {id: 'AE1', description: 'Adicione 1 avaliação', category: 'evaluations', actions_amount: 1},
        {id: 'AE5', description: 'Adicione 5 avaliação', category: 'evaluations', actions_amount: 5},
        // {id: 'AE25', description: 'Adicione 1 lugar', category: 'evaluations'},
        // {id: 'AE50', description: 'Adicione 1 lugar', category: 'evaluations'},
        // {id: 'AE100', description: 'Adicione 1 lugar', category: 'evaluations'},

        {id: 'AEE1', description: 'Atualize 1 avaliação de lugar', category: 'edit_evaluations', actions_amount: 1},
        {id: 'AEE5', description: 'Atualize 5 avaliações de lugar', category: 'edit_evaluations', actions_amount: 5},
        // {id: 'AEE25', description: 'Adicione 1 lugar', category: 'edit_evaluations'},
        // {id: 'AEE50', description: 'Adicione 1 lugar', category: 'edit_evaluations'},
        // {id: 'AEE100', description: 'Adicione 1 lugar', category: 'edit_evaluations'},
        
        {id: 'AC1', description: 'Adicione 1 comentário', category: 'comments', actions_amount: 1},
        {id: 'AC5', description: 'Adicione 5 comentários', category: 'comments', actions_amount: 5},
        // {id: 'AEE25', description: 'Adicione 1 lugar', category: 'comments'},
        // {id: 'AEE50', description: 'Adicione 1 lugar', category: 'comments'},
        // {id: 'AEE100', description: 'Adicione 1 lugar', category: 'comments'},
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
