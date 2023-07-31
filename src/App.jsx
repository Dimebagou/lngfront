import './App.css';
import PdfGenerator from './components/PdfGenerator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useForm, useFieldArray } from "react-hook-form";
import { useState } from 'react';

const App = () => {
    const { register, handleSubmit, control } = useForm();


    const [pdfVisible, setPdfVisible] = useState(false);
    const [pdfData, setPdfData] = useState(null);


    const { fields: contributorFields, append: appendContributor, remove: removeContributor } = useFieldArray({
        control,
        name: 'contributors',
    });

    const { fields: creditFields, append: appendCredit, remove: removeCredit } = useFieldArray({
        control,
        name: 'credits',
    });

    const onSubmit = (data) => {
        setPdfData(data);
        setPdfVisible(true);
    };

    const handleRemoveContributor = (index) => {
        removeContributor(index);
    };

    const handleRemoveCredit = (index) => {
        removeCredit(index);
    };

    return (
        <div className="App">
            <div className="logo">
                <img src="/logo.png" alt="LNG" />
            </div>
            <h1>L<span>egal </span>N<span>otices </span>G<span>enerator </span></h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Informations générales</h3>
                <div className="form-group">
                    <label htmlFor="site_url">Url du site :</label>
                    <input type="text" placeholder="https//www.example.com" {...register("site_url")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="site_owner">Nom de l'entreprise :</label>
                    <input type="text" placeholder="" {...register("site_owner")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="publication_director">Directeur de la publication :</label>
                    <input type="text" placeholder="" {...register("publication_director")} required />
                </div>

                <div className="form-group">
                    <label htmlFor="siren">Code SIREN :</label>
                    <input type="number" placeholder="" {...register("siren")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="mail">Contact Mail :</label>
                    <input type="mail" placeholder="example@mail.com" {...register("mail")} required />
                </div>
                <div className="data-officer">
                    <div className="form-group data-officer-top">
                        <label htmlFor="data_protection_officer">Délégué à la protection des données :</label>
                        <input type="text" placeholder="" {...register("data_protection_officer")} required />
                    </div>
                    <div className="form-group data-officer-bottom">
                        <label htmlFor="data_protection_officer_mail">Mail du délégué :</label>
                        <input type="text" placeholder="" {...register("data_protection_officer_mail")} required />
                    </div>
                </div>
                <h3>Adresse postale</h3>
                <div className="form-group">
                    <label htmlFor="adress">Numéro et nom de la rue :</label>
                    <input type="text" placeholder="" {...register("adress")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="postal_code">Code postal :</label>
                    <input type="text" placeholder="" {...register("postal_code")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Ville :</label>
                    <input type="text" placeholder="" {...register("city")} required />
                </div>
                <h3>Contributeurs</h3>
                {contributorFields.map((field, index) => (
                    <div className='contributors' key={field.id}>
                        <div className="form-group contributor-top">
                            <label htmlFor={`contributors[${index}].job`}>Travail :</label>
                            <input
                                type="text"
                                placeholder=""
                                {...register(`contributors[${index}].job`)}
                                required
                            />
                        </div>
                        <div className="form-group contributor-bottom">
                            <label htmlFor={`contributors[${index}].name`}>Nom et Prénom du contributeur :</label>
                            <input
                                type="text"
                                placeholder=""
                                {...register(`contributors[${index}].name`)}
                                required
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveContributor(index)}>
                            Supprimer
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => appendContributor({ job: '', name: '' })}>
                    Ajouter un contributeur
                </button>
                <h3>Hébergeur</h3>
                <div className="form-group">
                    <label htmlFor="host_name">Nom de l'hébergeur :</label>
                    <input type="text" placeholder="" {...register("host_name")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="host_address">Numéro et nom de la rue :</label>
                    <input type="text" placeholder="" {...register("host_address")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="host_postal_code">Code postal :</label>
                    <input type="text" placeholder="" {...register("host_postal_code")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="host_city">Ville :</label>
                    <input type="text" placeholder="" {...register("host_city")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="host_phone">Téléphone :</label>
                    <input type="text" placeholder="" {...register("host_phone")} required />
                </div>
                <h3>Crédits</h3>
                {creditFields.map((field, index) => (
                    <div className="credits" key={field.id}>
                        <div className="form-group credit-top">
                            <label htmlFor={`credits[${index}].name`}>Utilisation :</label>
                            <input
                                type="text"
                                placeholder=""
                                {...register(`credits[${index}].name`)}
                                required
                            />
                        </div>
                        <div className="form-group credit-bottom">
                            <label htmlFor={`credits[${index}].source`}>Source :</label>
                            <input
                                type="text"
                                placeholder=""
                                {...register(`credits[${index}].source`)}
                                required
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveCredit(index)}>
                            Supprimer
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => appendCredit({ name: '', source: '' })}>
                    Ajouter un crédit
                </button>
                <h3>Liens</h3>
                <div className="form-group">
                    <label htmlFor="privacy_policy_link">Lien vers la politique de confidentialité :</label>
                    <input type="text" placeholder="" {...register("privacy_policy_link")} required />
                </div>
                <div className="form-group">
                    <label htmlFor="terms_and_conditions_link">Lien vers les CGV :</label>
                    <input type="text" placeholder="" {...register("terms_and_conditions_link")} required />
                </div>
                <h3>Droits</h3>
                <div className="form-group">
                    <label htmlFor="courts_city">Ville des tribunaux compétents :</label>
                    <input type="text" placeholder="" {...register("courts_city")} required />
                </div>
                <button className='generate-button' type="submit">Générer le PDF</button>
            </form>
            
            {pdfVisible && <PdfGenerator formData={pdfData} />}

            
            <ToastContainer />
        </div>
    );
}

export default App;
