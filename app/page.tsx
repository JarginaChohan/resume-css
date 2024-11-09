import Image from "next/image";
import styles from "./page.module.css";
import ResumeBuilder from "./component/resume-builder-pure-css";

export default function Home() {
  return (
    <div>
      <ResumeBuilder/>
    </div>
  );
}
