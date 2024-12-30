const app = Vue.createApp({
  data() {
    return {
      name: 'Shanghai Cocktail',
      ingredients: ['1 oz Jamaican Light Rum', '1 tsp Anisette', 'Granadine 1/2 tsp', 'Juice of 1/4 Lemon'],
      imgUrl: 'https://www.thecocktaildb.com/images/media/drink/ttyrxr1478820678.jpg',
      instructions: 'Shake all ingredients with ice, strain into a cocktail glass, and serve.',
      cocktail: []
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const data = await response.json(); // Parse JSON into JS object

        const drink = data.drinks[0];

        this.name = drink.strDrink

        const keys = Object.keys(drink);
        
        const theIngredients = keys
          .filter((key) => key.startsWith("strIngredient") && drink[key] !== null)
          .map((key) => drink[key]);

        const theAmounts = keys
          .filter((key) => key.startsWith("strMeasure") && drink[key] !== null)
          .map((key) => drink[key]);

        console.log(theIngredients);
        console.log(theAmounts);

        const joint = [];

        for(let i = 0; i < theIngredients.length; i++) {
          const jointIngredient = theAmounts[i] + ' ' + theIngredients[i];
          joint.push(jointIngredient);
        }

        this.ingredients = joint;

        this.imgUrl = drink.strDrinkThumb;
        this.instructions = drink.strInstructions;

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchData(); // Call the method when the component is mounted
  },
})
