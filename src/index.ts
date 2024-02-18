import { createPlayer } from "./data/testObjects";
import { SelectActionInteractively } from "./strategies/selectActionInteractively";

// async function sayHello() {
//   return input({ message: "Enter your name:" });
// }
// // sayHello().then((name) => console.log(`Hello ${name}!`));
//
// async function selectColor() {
//   return select({
//     message: "Select a color",
//     choices: [
//       { name: "Red", value: "red", description: "A very nice color." },
//       { name: "Green", value: "green", description: "Not sure about this." },
//       { name: "Blue", value: "blue", description: "The best color." },
//       new Separator(),
//       { name: "Custom", value: "custom" },
//     ],
//   });
// }
//
// // selectColor().then((color) => console.log(`You selected ${color}!`));
//
// async function chainPrompts() {
//   const name = await sayHello();
//   let color = await selectColor();
//   while (color !== "green") {
//     console.log(`Hello ${name}! You selected ${color}!`);
//     color = await selectColor();
//   }
//   return { name, color };
// }
//
// chainPrompts().then(({ name, color }) => {
//   console.log(`Hello ${name}! You selected ${color}!`);
// });

async function testInteractiveActionSelection() {
  const strategy = new SelectActionInteractively();
  const player = createPlayer({ strategy });
  const actions = player.getPossibleActions(true);
  return player.selectAction(actions);
}

testInteractiveActionSelection().then((action) => {
  console.log(`You selected: ${action.description}`);
});
