function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then( states => {

        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json() })
    .then( cities => {

        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]")
  .addEventListener("change", getCities)


    // === Itens de Coleta ===
const itemsToCollect = document.querySelectorAll(".items-grid li")

for( const item of itemsToCollect) {
      item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let SelectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //Adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)

    //verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = SelectedItems.findIndex( item => {
        const itemFound = item == itemId //True or False
        return itemFound
    })

    //se já estiver selecionado, tirara da seleção
    if (alreadySelected >= 0) {
        const filteredItems = SelectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        SelectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar á seleção
        SelectedItems.push(itemId)
    }

    //console.log('selectedItems: ', SelectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = SelectedItems
}