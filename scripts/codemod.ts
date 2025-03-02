import { type SourceFile, Project, SyntaxKind } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const TARGET_COMPONENT = "Legacy";
const NEW_COMPONENT = "New";
const OLD_IMPORT = "@/components/v3/Legacy/Legacy";
const NEW_IMPORT = "@/components/v3/New/New";

const files: Array<SourceFile> = project.getSourceFiles("src/**");

// console.log(files);

files.forEach((file) => {
  const importDeclarationList = file.getImportDeclarations();
  const DescendantSyntax = SyntaxKind.Identifier;
  const descendantsOfKind = file.getDescendantsOfKind(DescendantSyntax);

  importDeclarationList.forEach((importDecl) => {
    const moduleSpecifierValue = importDecl.getModuleSpecifierValue();
    if (moduleSpecifierValue === OLD_IMPORT) {
      importDecl.setModuleSpecifier(NEW_IMPORT);
    }
  });

  descendantsOfKind.forEach((descendant) => {
    const componentName = descendant.getText();
    if (componentName === TARGET_COMPONENT) {
      descendant.replaceWithText(NEW_COMPONENT);
    }
  });

  // file.saveSync();
  // console.log(
  //   file.getImportDeclaration((condition: any) => {
  //     console.log(1);
  //     return true;
  //   })
  // );
});

export {};

// files.forEach((file: any) => {
//   let modified = false;
//   file.getImportDeclarations().forEach((importDecl: any) => {
//     console.log(importDecl.getModuleSpecifierValue());
//     if (importDecl.getModuleSpecifierValue() === OLD_IMPORT) {
//       importDecl.getNamedImports().forEach((namedImport: any) => {
//         if (namedImport.getName() === TARGET_COMPONENT) {
//           namedImport.renameAlias(NEW_COMPONENT);
//           importDecl.setModuleSpecifier(NEW_IMPORT);
//           modified = true;
//         }
//       });
//     }
//   });

//   file
//     .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
//     .forEach((jsxTag: any) => {
//       if (jsxTag.getTagNameNode().getText() === TARGET_COMPONENT) {
//         jsxTag.getTagNameNode().replaceWithText(NEW_COMPONENT);
//         modified = true;
//       }
//     });

//   file
//     .getDescendantsOfKind(SyntaxKind.JsxClosingElement)
//     .forEach((jsxTag: any) => {
//       if (jsxTag.getTagNameNode().getText() === TARGET_COMPONENT) {
//         jsxTag.getTagNameNode().replaceWithText(NEW_COMPONENT);
//         modified = true;
//       }
//     });

//   if (modified) {
//     file.saveSync();
//     console.log(`Updated: ${file.getFilePath()}`);
//   }
// });
