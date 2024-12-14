import {motion} from "framer-motion";
export const FadeUp = (delay) => {
    return {
        hidden: {
            opacity: 0, 
            y : 100
        },

        visible: {
            opacity: 1, 
            y : 0, 
            transition: {
                duration: 1,
                delay: delay,
            },
        },
    };
};

// export const FadeLeft = (delay) => {
//     return {
//         hidden: {
//             opacity: 0, 
//             y : 100
//         },

//         visible: {
//             opacity: 1, 
//             y : 0, 
//             transition: {
//                 duration: 1,
//                 delay: delay,
//             },
//         },
//     };
// }; 