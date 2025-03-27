import CategoryManager from "@/components/EditCategory/CategoryManager";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/footer";

export default function CreateChangeDeletePage() {
  return (
    <main>
      <Navigation />
      <div className="page">
        <CategoryManager />
      </div>
      <Footer />
    </main>
  );
}
