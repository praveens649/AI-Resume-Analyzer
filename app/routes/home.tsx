import { resumes } from "constant";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useNavigate} from "react-router";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumerzz" },
    { name: "description", content: "Get your Resume potential analyzed by AI" },
  ];
}
export default function Home() {
  const { auth} = usePuterStore();
  const navigate = useNavigate();
useEffect(() => {
  if(!auth.isAuthenticated) navigate('/auth?next=/');
}, [auth.isAuthenticated])
return (
 <main className="bg-[url('/images/bg-main.jpg')] bg-cover">
    <section className="main-section">
      <Navbar />
      <div className="page-heading py-16">
        <h1>Get your Resume potential analyzed by AI</h1>
        <h2>Review your Resume and get insights on how to improve it</h2>
      </div>
      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
</main>)
}
