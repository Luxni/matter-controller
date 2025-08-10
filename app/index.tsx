
import { useEffect } from "react";
import { Text } from "react-native";
import { Controller } from "../src/controller/Controller";

export default function App() {

    const setupMatterServer = async () => {
        const controller = new Controller();
        await controller.start();
    };

    useEffect(() => {
        setupMatterServer();
    }, []);


    return (<Text>Hallo</Text>);
}
