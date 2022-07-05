import { Pressable, View, Text, TouchableOpacity } from "react-native"
import { useState } from "react"
import { Button, Icon } from "react-native-elements"
import styles from "../../styles/styles"
import StyledText from '../components/StyledText'
import { format } from 'date-fns'
import Swipeable from 'react-native-swipeable';




const formatDate = (date) => {
    const newDate = new Date(date).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' })
    const splittedDate = newDate.split(' ')

    if (splittedDate.length >= 3) {
        const splittedHour = splittedDate[3]?.split(':') ?? []

        return `${splittedHour[0]}:${splittedHour[1]}`
    }

    return newDate
}





function showDate(time, lastDate) {

    const timeFormated = format(new Date(time), "dd/MM/yyyy").split("/")
    const lastDayFormatted = format(new Date(lastDate), "dd/MM/yyyy").split("/")

    // const actualDate = new Date(timeFormated)
    // const lastDayDate = new Date(lastDayFormatted)
    const day = timeFormated[0]
    const lastDay = lastDayFormatted[0]
    const month = timeFormated[1]
    const lastMonth = lastDayFormatted[1]
    const year = timeFormated[2]

    if (day !== lastDay || month !== lastMonth) {
        return <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 5, backgroundColor: styles.colors.mainColor, justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
            <StyledText padding5 white bold big black>
                {day}/{month}/{year}

            </StyledText>
            <Icon name="calendar" type="feather" color="white"></Icon>
        </View>
    }

    return <Text></Text>
}







/* ----------------------------------------------------------------*/



const ProposalItem = ({ time, title, zone, description, lastDate, separator }) => {

    const [bgColor, setBgColor] = useState(styles.colors.onTapOutColor)

    const date = formatDate(time)
    let swipeableRef  = null

    const rightButtons = [
        <View style={styles.swipeList.rowBack}>
            <TouchableOpacity style={[styles.swipeList.button_right, styles.swipeList.button_right_back_left]}>
                <Icon name="check-circle" type="feather"></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.swipeList.button_right, styles.swipeList.button_right_back_right]}>
                <Icon name="trash" type="feather"></Icon>
            </TouchableOpacity>
        </View>
    ];
    return (
        <View>
            {showDate(time, lastDate)}
            <Swipeable
                onRightActionRelease={() => {
                }}
                
                rightButtonWidth={150}
                rightButtons={rightButtons}
            >

                <Pressable onPressIn={() => setBgColor(styles.colors.onTapInColor)} onPressOut={() => setBgColor(styles.colors.onTapOutColor)}>

                    <View style={{ backgroundColor: bgColor, padding: 5, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ flex: 1 }}>
                            <StyledText bold mainColor>
                                {title}
                            </StyledText>
                            <StyledText  >
                                {zone}
                            </StyledText>

                        </View>
                        <View style={{ flex: 2 }}>
                            <StyledText numberOfLines={2} >
                                {description}
                            </StyledText>
                        </View>
                        <View style={{ flex: 1 }}>
                            <StyledText alignCenter>
                                {date}
                            </StyledText>
                        </View>
                    </View>
                </Pressable>
            </Swipeable>
        </View>
    )
}

export default ProposalItem