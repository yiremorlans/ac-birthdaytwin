document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const month = document.querySelector('.month').value.toLowerCase()
  const day = document.querySelector('.day').value
  // console.log(month, day)

  const url = `https://api.nookipedia.com/villagers?api_key=e4bd58d8-da13-4aa1-a208-dba6f628e4be&birthmonth=${month}&birthday=${day}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if ( month === '' && day === '') {
          alert(`Please include month and day!`)
        } else {
          let villager = {}
            for (const item of data) {
                if (item.appearances.includes('NH')){
                  villager = item
                  }
            }
            console.log(villager)
          const animal = new Villager(villager)
          animal.showVillager()
        }
      })

      .catch(err => {
        alert(`Please use valid date. Ex: May 3`)
      });
}



class Villager {
  constructor(villager) { //I am passing in data[0] to get image_url and other properties
    this.name = villager.name
    this.species = villager.species
    this.image = villager.image_url
    this.phrase = villager.phrase
    this.personality = villager.personality
    this.quote = villager.quote
  }


  showVillager() {
        document.querySelector('h2').innerText = `${this.name}, the ${this.species}`
        document.querySelector('.villager').src = this.image
        document.querySelector('h4').innerText = `${this.personality} personality`
        document.querySelector('h3').innerText = `" ${this.quote.slice(0,-1)}, ${this.phrase}. "`
    
  }
}