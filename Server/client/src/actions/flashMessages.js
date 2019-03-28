export const ADD_FLASH_MESSAGE = "add_flash_message";
export const DELETE_FLASH_MESSAGE = "delete_flash_message";


export function addFlashMessages(message) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}

export function deleteFlashMessage(id) {
    return {
        type: DELETE_FLASH_MESSAGE,
        id
    }
}