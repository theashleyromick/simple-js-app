let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : console.log("pokemon is not correct");
  }
  function n() {
    return e;
  }
  function o(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function i(e) {
    o(e).then(function () {
      $("#pokemonModal").modal("show"),
        (document.querySelector("#modal-pokemon-name").innerText = e.name),
        (document.querySelector(
          "#modal-pokemon-height"
        ).innerText = `Height: ${e.height}m`),
        (document.querySelector("#modal-pokemon-image").src = e.imageUrl);
    });
  }
  return {
    add: t,
    getAll: n,
    addListItem: function e(t) {
      let n = document.querySelector(".pokemon-list"),
        o = document.createElement("li");
      o.classList.add("list-group-item");
      let r = document.createElement("button");
      (r.innerText = t.name),
        r.classList.add("pokemon-button", "btn", "btn-primary"),
        o.appendChild(r),
        n.appendChild(o),
        r.addEventListener("click", function () {
          i(t);
        });
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            t({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: o,
    showDetails: i,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
