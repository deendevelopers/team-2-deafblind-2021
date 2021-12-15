const Fallback = () => (
    <section className="fallback-container">
        <h3>Please Wait - Recipe Details are Loading........</h3>
        <style jsx>{`
            .fallback-container {
                box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
                padding: 5vh;
            }
        `}</style>
    </section>
)

export default Fallback;