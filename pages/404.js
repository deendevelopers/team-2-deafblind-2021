import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 5000);
    }, []);

    return (
        <section className="not-found-page">
            <h3>404</h3>
            <Image 
                src="/404Image.png"
                alt="A broken cup"
                width={300}
                height={300}
            />
            <p>Oooops! This page does not exist!</p>
            <p>But do not worry, we are redirecting to the <Link href="/"><a>Homepage</a></Link> shortly!</p>
            <style jsx>{`
                .not-found-page{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
                    text-align: center;
                    padding: 1vw;
                }

                .not-found-page h3{
                    font-size: 3rem;
                }
            `}</style>
        </section>
    )
}

export default NotFound;