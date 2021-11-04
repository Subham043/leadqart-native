import React from 'react'
import RBSheet from "react-native-raw-bottom-sheet";

const BottomMaskPopUp = ({ refRBSheet, children, height }) => {
    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={height}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.5)"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                },
                container: {
                    backgroundColor: "#EFEFEF",
                    width: "100%",
                }
            }}
        >
            {children}
        </RBSheet>
    )
}

export default BottomMaskPopUp
