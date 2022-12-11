import DaumPostcode from "react-daum-postcode";

const AddressPopUp = (props) => {
    const setValue = props.setValue;

    const onCompletePost = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }
        setValue("addressUpper", fullAddr);
    };

    const style = {
        position: 'fixed',
        left: '20%',
        top: '20%',
        width: '25%',
        zIndex: 99
    }

    return (
        <>
            <DaumPostcode
                style={style}
                autoClose
                onComplete={onCompletePost}
            />
        </>
    );
};

export default AddressPopUp;