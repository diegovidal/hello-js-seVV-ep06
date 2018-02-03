const pessoas = [
    {idpessoa: 1, nomepessoa: "Diego Vidal", telefone: "883728273"},
    {idpessoa: 2, nomepessoa: "Victor Vidal", telefone: "74837384"},
    {idpessoa: 3, nomepessoa: "Guilherme Augusto", telefone: "928229202"},
    {idpessoa: 4, nomepessoa: "Isabela Gondim", telefone: "857383021"},
    {idpessoa: 5, nomepessoa: "Bruno Poti", telefone: "0294848929"}
]

exports.up = knex => knex('pessoa').insert(pessoas)

exports.down = function(knex, Promise) {
  
    return knex('pessoa').del()
        .whereIn('idpessoa', pessoas.map(e => e.idpessoa))
};
