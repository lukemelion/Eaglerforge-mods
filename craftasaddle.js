(function addsaddleRecipe() {
    ModAPI.meta.title("Craft a Saddle Mod");
    ModAPI.meta.description("Adds a crafting recipe to create a saddle from leather and string.");

    async function addsaddleRecipe() {
        await new Promise((res,rej)=>{var x = setInterval(()=>{if(ModAPI.items){clearInterval(x);res();}}, 100);})
        var ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
        function ToChar(char) {
            return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
        }

        // Define the recipe legend to map characters to items
        var recipeLegend = {
            "S": {
                type: "item",
                id: "string" // Using string 
            }
            "L": {
                type: "item",
                id: "leather" // Using leather 
            }
        };

        // Define the crafting grid pattern for the recipe
        var recipePattern = [
            "LLL",
            "LSL",
            ""
        ];

        // Convert the recipe pattern and legend into the required format
        var recipeInternal = [];
        Object.keys(recipeLegend).forEach((key) => {
            recipeInternal.push(ToChar(key));
            var ingredient = ModAPI.items[recipeLegend[key].id].getRef();
            recipeInternal.push(ingredient);
        });

        var recipeContents = recipePattern.flatMap(row => ModAPI.util.str(row));
        var recipe = ModAPI.util.makeArray(ObjectClass, recipeContents.concat(recipeInternal));

        // Define the output item as diamond_block
        var resultItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1](ModAPI.blocks["saddle"].getRef(), 1);



        // Register the recipe with CraftingManager
        var craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
        ModAPI.hooks.methods.nmic_CraftingManager_addRecipe(craftingManager, resultItem, recipe);
    }

    ModAPI.dedicatedServer.appendCode(addsaddleRecipe);

    addsaddleRecipe();
})();