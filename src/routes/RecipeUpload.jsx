import Editor from "../components/Editor";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";

export default function RecipeUpload() {
  return (
    <ProtectedPage>
      <Layout hasTabBar canGoBack title="Upload">
        <h1>Recipe Upload</h1>
        <Editor />
      </Layout>
    </ProtectedPage>
  );
}
