// import axios from 'axios';
import DoctorTable from './DoctorTable';

const Doctors = () => {
   
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="w-full">
                            <DoctorTable/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Doctors