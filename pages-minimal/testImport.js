// // userAST.__paths[0].value.program.body[0].specifiers[0].imported -> Identifier (gSSP)
// // userAST.__paths[0].value.program.body[0].specifiers[0].local -> Identifier (dog)
//
// // body[0] -> ImportDeclaration
// // body[0].specifiers[0] -> ImportSpecifier
//
// // add `local` with alias (nope, replace also)
// import { getServerSideProps } from "../helpers/dataFetchers";
//
// // replace name of `local` with alias
// import { whatever as getServerSideProps2 } from "../helpers/dataFetchers";

// -------

// // userAST.__paths[0].value.program.body[0] -> ImportDeclaration
// // userAST.__paths[0].value.program.body[0].specifiers[0] -> "ImportNamespaceSpecifier"
// // userAST.__paths[0].value.program.body[0].specifiers[0].local -> Identifier (dataFetchers)
//
// // userAST.__paths[0].value.program.body[1] ->"VariableDeclaration"
// // userAST.__paths[0].value.program.body[1].declarations[0] -> "VariableDeclarator"
// // userAST.__paths[0].value.program.body[1].declarations[0].init -> Identifier (dataFetchers)
// // userAST.__paths[0].value.program.body[1].declarations[0].id ->"ObjectPattern"
// // userAST.__paths[0].value.program.body[1].declarations[0].id.properties[0] ->"Property" (kind: 'init', shorthand: true, method: false) (kind: 'init', shorthand: false, method: false)
// // userAST.__paths[0].value.program.body[1].declarations[0].id.properties[0].key -> Identifier (gSSP) (whatever)
// // userAST.__paths[0].value.program.body[1].declarations[0].id.properties[0].value -> Identifier (gSSP) (gSSP3)
//
// // (add :xxx)

/**
 * Property.check(parent) && ObjectPattern.check(grandparent and greatgrandparent) && VariableDeclarator.check(greatGrandparent)
 */

// import * as dataFetchers from "../helpers/dataFetchers";
// const { getServerSideProps } = dataFetchers;

//
// // replace name of :xxx
// // import * as dataFetchers from "../helpers/dataFetchers";
// const { whatever: getServerSideProps3 } = dataFetchers;
//

/**
 * VariableDeclarator.check(parent) && parent.id === node
 *
 * not MemberExpression.check(parent) && parent.property === node
 */

// import * as dataFetchers from "../helpers/dataFetchers";
// const getServerSideProps = dataFetchers.getServerSideProps;

// export {getServerSideProps} from "../helpers/dataFetchers"
export * from "../helpers/dataFetchers";

export default function SimplePage() {
  return <div>This is a very simple page.</div>;
}

// let y = { getServerSideProps };
// y = { getServerSideProps };

// // export { dog };
// export { getServerSideProps };
// console.log(dog);
// export { getServerSideProps2 };
// // export { getServerSideProps3 };

/**
 * VariableDeclarator.check(parent) && VariableDeclaration.check(grandparent and greatGrandparent) && ExportNamedDeclaration.check(greatGreatGrandparent)
 */

export const getServerSideProps = () => null;
export const dog = "great";
export function doStuff() {
  return null;
}
/**
 *FunctionDeclaration.check(parent) && ExportNamedDeclaration.check(grandparent)
 */

// export function getServerSideProps() {
//   return null;
// }

// export function getStaticPaths() {
//   return null;
// }
