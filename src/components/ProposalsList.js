import React, { useState } from "react";

import { View,FlatList } from "react-native";
import proposals from "../data/proposals";
import ProposalItem from "./ProposalItem";
import styles from '../../styles/styles'


function sortDates(ascent, proposals) {
    if (ascent) {
        return proposals.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    }
    return proposals.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
}


// const HiddenItemWithActions = props => {
//     const { onClose, onDelete } = props
//     return (
//             <TouchableOpacity style={[styles.swipeList.button_right, styles.swipeList.button_right_back_left]}>
//                 <Icon name="check-circle" type="feather"></Icon>
//             </TouchableOpacity>,
//             <TouchableOpacity style={[styles.swipeList.button_right, styles.swipeList.button_right_back_right]}>
//                 <Icon name="trash" type="feather"></Icon>
//             </TouchableOpacity>
//     )
// }

// const renderHiddenItem = ({ item: proposal, index }) => {
//     return (
//         <HiddenItemWithActions
//             data={proposal}
//             index={index}
//             onClose={() => { }}
//             onDelete={() => { }}
//         />
//     )
// }








const ProposalsList = () => {

    const [ascent, setAscent] = useState(false)

    const sorted_dates = sortDates(ascent, proposals)


    return (
        <View style={styles.proposal.container}>
            
            {/* -------------------------DESCOMENTAR ESTO PARA TABLET------------------------- */}

            {/* <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#6556D9', fontSize: 30 }}>Proposals</Text>
                    <Icon name="arrow-right" type='evilicon' size={35} color='#6556D9' ></Icon>
                </View>
                <View style={{ display: 'flex', }}>
                    {ascent ?
                        <Pressable onPress={() => setAscent(false)} >
                            <Icon name="arrow-up-drop-circle" type="material-community" style={{ padding: 5, alignItems: 'center' }} size={30}></Icon>
                        </Pressable>
                        :
                        <Pressable onPress={() => setAscent(true)}>
                            <Icon name="arrow-up-drop-circle" type="material-community" style={{ padding: 5, alignItems: 'center', transform: [{ rotateX: '180deg' }] }} size={30}></Icon>
                        </Pressable>
                    }
                </View>
            </View> */}
            <FlatList
                key={(item) => item.id}
                data={sorted_dates}

                renderItem={({ item: proposal, index }) => (


                    <ProposalItem
                        time={proposal.time}
                        title={proposal.title}
                        zone={proposal.zone}
                        description={proposal.description}
                        lastDate={proposals[index - 1]?.time ?? 0}
                    //lastItemRef={proposals[index -1].id}
                    />
                )}
                

                

            ></FlatList>

        </View>
    )

}

export default ProposalsList