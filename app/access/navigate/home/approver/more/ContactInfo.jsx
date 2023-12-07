import { View, Text, StyleSheet, } from "react-native";

import PageHeader from "../../../../../../components/header/PagesHeader";
export default function ContactInfo () {
    return (
        <>
            <PageHeader pageName={'Contact Information'} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


})