import ReactDom from "react-dom"
function App(){
    return (
        <h1>Hello, world!</h1>
    )
}
ReactDom.render(<App />, document.querySelector("#app"))