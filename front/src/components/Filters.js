import React from 'react';
import Divider from "@material-ui/core/Divider";
import PriceFilter from "./PriceFilters";
import CategoryFilter from "./CategoryFilter";
import CountryFilter from "./CountryFilter";
import Typography from "@material-ui/core/Typography";


export default function Filters({error, loading}) {

    return (
        <div>
            {loading ? <Typography>Загрузка...</Typography>  :
                error ? <Typography>Помилка</Typography>  :
                    <>
                    <CategoryFilter/>
                    <Divider />
                    <CountryFilter/>
                    <Divider />
                    <PriceFilter/>
                    </>
            }

        </div>

    );
}
