import BeatLoader from "react-spinners/PulseLoader";

const Loader = (props: any) => {
    return (
        <BeatLoader
            color={"#4466c4"}
            loading={props.loading}
            size={12}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
};
export default Loader;
