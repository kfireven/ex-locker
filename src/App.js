import Locker from "./Locker";

function App() {
    return (
        <div className="App">
            <Locker pinCode={1337} onUnlock={() => alert("Unlocked!")} />
        </div>
    );
}

export default App;
