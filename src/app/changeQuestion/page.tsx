import QuestionUpdater from "@/components/PatchQuestion/PatchQuestion";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/footer";

export default function UpdateQuestionPage() {
  return (
    <main>
      <Navigation />
      <div className="page">
        <QuestionUpdater />
      </div>
      <Footer />
    </main>
  );
}


