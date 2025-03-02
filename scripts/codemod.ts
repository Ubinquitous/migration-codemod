import { type SourceFile, Project, SyntaxKind } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

const TARGET_COMPONENT = "Legacy";
const NEW_COMPONENT = "New";
const OLD_IMPORT = "@/components/v3/Legacy/Legacy";
const NEW_IMPORT = "@/components/v3/New/New";

const files: Array<SourceFile> = project.getSourceFiles("src/**");

files.forEach((file) => {
  const importDeclarationList = file.getImportDeclarations();
  const DescendantSyntax = SyntaxKind.JsxSelfClosingElement;
  const descendantsOfKind = file.getDescendantsOfKind(DescendantSyntax);

  importDeclarationList.forEach((importDecl) => {
    const moduleSpecifierValue = importDecl.getModuleSpecifierValue();
    if (moduleSpecifierValue === OLD_IMPORT) {
      importDecl.setModuleSpecifier(NEW_IMPORT);
      importDecl.setDefaultImport(NEW_COMPONENT);
      // console.log(importDecl.getDefaultImport()?.getText());
    }
  });

  descendantsOfKind.forEach((descendant) => {
    const component = descendant.getTagNameNode().getFullText();

    if (component === TARGET_COMPONENT) {
      descendant.getTagNameNode().replaceWithText(NEW_COMPONENT);
      console.log(descendant.getAttribute("prop1"));
      descendant.insertAttribute(0, { name: "prop2", initializer: "{2}" });
    }
  });

  file.saveSync();
  // TODO : props change
});

export {};
