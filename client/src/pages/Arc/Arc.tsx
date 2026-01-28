import { useEffect } from 'react';
import { connect } from 'react-redux'

import type { Arc } from './types';
import { fetchArcData } from "../../actions";
import CardGrid from "../../components/CardGrid/CardGrid";

interface ArcProps {
    fetchArcData: () => void;
    arc: Arc[];
}

const Arc = ({ fetchArcData, arc }: ArcProps) => {

    useEffect(() => {
        fetchArcData();
    }, [fetchArcData]);

    return (
        <CardGrid heading="Arc" items={arc} />
    )
}

const mapStateToProps = (state: { arc: Arc[] }) => ({
    arc: state.arc
})

export default connect(mapStateToProps, { fetchArcData })(Arc)