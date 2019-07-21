import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

import './loader.css'

export const Loader = () => (
    <div className="loading-shading-mui">
        <CircularProgress className="loading-icon-mui" />
    </div>
)