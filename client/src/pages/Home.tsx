// @ts-ignore
import Games from './../components/Games.tsx';
// @ts-ignore
import About from './../components/About.tsx';
// @ts-ignore
import Contact from './../components/Contact.tsx';

export default function Home() {
    return (
        <div className="container">
            
            <Games />
            <About />
            <Contact />

        </div>        
    )
}