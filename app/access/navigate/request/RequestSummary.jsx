import { View, Text , StyleSheet} from "react-native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

import PageHeader from "../../../../components/header/PagesHeader";

export default function RequestSummary() {
    const route = useRoute()

    return (

        <>
            <PageHeader pageName={"Request Summary"} />

            <View style={styles.container}>
                <Text>Request Summary</Text>
                <Text>{moment(route.params?.startDate, "YYYYMMDD").format("MMMM DD, YYYY")}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})