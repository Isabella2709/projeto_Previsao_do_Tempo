const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

const sectionInfos = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionInfos) return;

  const localizacao = input.value;

  if (localizacao.length < 4) {
    alert("O local precisa ter pelo menos 3 letras.");
    return;
  }

  try{

  const resposta = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=741c9f54cba14d0ae495ff70d4bede2f&lang=pt_br&units=metric`
  );

  const dados = await resposta.json();

  console.log(dados);

  const infos = {
    temperatura: Math.round(dados.main.temp),
    local: dados.name,
    icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
  };

  sectionInfos.innerHTML = `
  <div class="tempo-dados">
  <h2>${infos.local}</h2>
  <span>${infos.temperatura}º</span>
  </div>
  <img src=${infos.icone}>`;
  }catch(err){
    console.log("Deu um erro ao obter os dados da API", err);
  }
});
