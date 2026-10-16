import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Photobooth from "@/components/Photobooth";
import Venue from "@/components/Venue";
import Gallery from "@/components/Gallery";
import Rsvp from "@/components/Rsvp";
import Gifts from "@/components/Gifts";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import Petals from "@/components/Petals";
import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <Petals />
      <MusicPlayer />
      <main className="max-w-2xl mx-auto bg-white shadow-2xl relative min-h-screen md:my-6 md:rounded-3xl overflow-hidden">
        <Hero />
        <Reveal>
          <Invitation />
        </Reveal>
        <Reveal>
          <Photobooth />
        </Reveal>
        <Reveal>
          <Venue />
        </Reveal>
        <Reveal>
          <Gallery />
        </Reveal>
        <Reveal>
          <Rsvp />
        </Reveal>
        {/* <Reveal><Gifts /></Reveal> */}
        <Reveal>
          <Wishes />
        </Reveal>
        <Footer />
      </main>
    </>
  );
}
