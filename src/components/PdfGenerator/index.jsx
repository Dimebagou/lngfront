import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";


import './index.css';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#1C797D",
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    section: {

        padding: 10,
        flexGrow: 1,
    },
    title: {
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'start',
        color: "#2F5373",
        fontWeight: 'bold',
        fontSize: 40,
    },
    section_title: {
        fontSize: 30,
        margin: 10,
    },
    section_text: {
        fontSize: 15,
        marginLeft: 10,
    },
    section_text_array: {
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10
    },
    section_text_array_title: {
        fontSize: 15,
        marginLeft: 10,
        marginBottom: -10
    },
    section_link: {
        fontSize: 15,
        color: "#c36",
    }
});

const PdfGenerator = ({ formData }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEmailPDF = async (event) => {

        event.preventDefault();

        const fetchSendMail = async () => {

            try {
                setIsLoading(true);
                setIsDisabled(true);
                console.log(isDisabled)
                console.log({ formData, recipientEmail: email });
                const response = await fetch('http://localhost:8080/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ formData, recipientEmail: email }),
                });
                if (response.status !== 200) {
                    toast.error("Oups ! Quelque chose s'est mal passé !", {
                        position: "top-center",
                        style: {
                            borderRadius: "10px",
                            border: "2px solid #34495e",
                            background: "#2c3e50",
                            color: "#fff",
                            fontSize: "1.2rem",
                            padding: "20px",
                        },
                        closeButton: false,
                    });
                }

                if (response.status === 200) {

                    const result = await response.json();
                    const message = result.message;
                    toast.success(message, {
                        position: "top-center",
                        style: {
                            borderRadius: "10px",
                            border: "2px solid #34495e",
                            background: "#2c3e50",
                            color: "#fff",
                            fontSize: "1.2rem",
                            padding: "20px",
                        },
                        closeButton: false,

                    });
                }

                setIsLoading(false);
                setIsDisabled(false);

            } catch (error) {
                toast.error("Oups ! Quelque chose s'est mal passé !", {
                    position: "top-center",
                    style: {
                        borderRadius: "10px",
                        border: "2px solid #34495e",
                        background: "#2c3e50",
                        color: "#fff",
                        fontSize: "1.2rem",
                        padding: "20px",
                    },
                    closeButton: false,

                });
                console.log(error);
                setIsLoading(false);
                setIsDisabled(false);

            }
        }

        fetchSendMail();




    };

    return (
        <div className="pdf-container">
            <form onSubmit={handleEmailPDF}>
                <label htmlFor="email">Entrez votre mail afin de recevoir le PDF :</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Entrez votre mail"
                    required
                />
                <ClipLoader
                    loading={isLoading}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <button type="submit" disabled={isDisabled}>Recevoir le PDF par mail</button>

            </form>
            {/* Rest of the PDF rendering code */}
            <PDFViewer width="100%" height="100%">
                <Document title='Mentions Légales'>
                    <Page size="A4" style={styles.page}>
                        <Text style={styles.title}>Mentions Légales</Text>
                        <View style={styles.section}>

                            <Text style={styles.section_title}>1 – Édition du site</Text>

                            <Text style={styles.section_text}>En vertu de <Link style={styles.section_link} src={"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164#LEGIARTI000042038977"}>l’article 6 de la loi n° 2004-575 du 21 juin 2004</Link> pour la confiance dans l’économie numérique, il est précisé aux utilisateurs du site internet <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link> l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi : {'\n'} </Text>

                            <Text style={styles.section_text}>Propriétaire du site : {formData.site_owner} - Contact : {formData.mail} - Adresse : {formData.address}, {formData.postal_code} {formData.city} {'\n'} </Text>

                            <Text style={styles.section_text}>Identification de l’entreprise : {formData.site_owner} - SIREN : {formData.siren} {'\n'} </Text>

                            <Text style={styles.section_text}>Adresse postale : {formData.address}, {formData.postal_code} {formData.city} - <Link style={styles.section_link} src={formData.terms_and_conditions_link}>{formData.terms_and_conditions_link}</Link> {'\n'} </Text>

                            <Text style={styles.section_text}>Directeur de la publication : {formData.publication_director} {'\n'} </Text>

                            <Text style={styles.section_text}>Hébergeur : {formData.host_name} - {formData.host_address} - {formData.host_postal_code} {formData.host_city} - Téléphone : {formData.host_phone} {'\n'} </Text>

                            <Text style={styles.section_text}>Délégué à la protection des données : {formData.data_protection_officer} - {formData.data_protection_officer_mail} {'\n'}  </Text>

                            {formData.contributors?.length > 0 && (
                                <>
                                    <Text style={styles.section_text_array_title}>Autres contributeurs : {'\n'} </Text>
                                    {formData.contributors.map((contributor, index) => (
                                        <Text key={index} style={styles.section_text_array}>
                                            {contributor.job} - {contributor.name}
                                        </Text>
                                    ))}
                                </>
                            )}

                            {formData.credits?.length > 0 && (
                                <>
                                    <Text style={styles.section_text_array_title}>Crédits : {'\n'} </Text>
                                    {formData.credits.map((credit, index) => (
                                        <Text key={index} style={styles.section_text_array}>
                                            {credit.name} - {credit.source}
                                        </Text>
                                    ))}
                                </>
                            )}


                            <Text style={styles.section_title}>2 – Propriété intellectuelle et contrefaçons.</Text>

                            <Text style={styles.section_text}>{formData.site_owner} est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons. {'\n'} </Text>

                            <Text style={styles.section_text}>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de {formData.site_owner}.</Text>

                            <Text style={styles.section_text}>Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles <Link style={styles.section_link} src={"https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032655082"}>L.335-2 et suivants du Code de Propriété Intellectuelle</Link>.</Text>

                            <Text style={styles.section_title}>3 – Limitations de responsabilité.</Text>

                            <Text style={styles.section_text}>{formData.site_owner} ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link>. {'\n'} </Text>

                            <Text style={styles.section_text}>{formData.site_owner} décline toute responsabilité quant à l’utilisation qui pourrait être faite des informations et contenus présents sur <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link>. {'\n'} </Text>

                            <Text style={styles.section_text}>{formData.site_owner} s’engage à sécuriser au mieux le site <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link>, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu. {'\n'} </Text>

                            <Text style={styles.section_text}>Des espaces interactifs (espace contact ou commentaires) sont à la disposition des utilisateurs. {formData.site_owner} se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. {'\n'}</Text>

                            <Text style={styles.section_text}>Le cas échéant, {formData.site_owner} se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie …). {'\n'}</Text>

                            <Text style={styles.section_title}>4 – CNIL et gestion des données personnelles.</Text>

                            <Text style={styles.section_text}>Conformément aux dispositions de <Link style={styles.section_link} src={"https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000886460"}>la loi 78-17 du 6 janvier 1978 modifiée</Link>, l’utilisateur du site <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link> dispose d’un droit d’accès, de modification et de suppression des informations collectées. Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données : {formData.data_protection_officer} – {formData.data_protection_officer_mail}. {'\n'} </Text>

                            <Text style={styles.section_text}>Pour plus d’informations sur la façon dont nous traitons vos données (type de données, finalité, destinataire…), lisez notre <Link style={styles.section_link} src={formData.privacy_policy_link}>Politique de confidentialité</Link>. {'\n'}</Text>

                            <Text style={styles.section_title}>5 – Liens hypertextes et cookies</Text>

                            <Text style={styles.section_text}>Le site <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link> contient des liens hypertextes vers d’autres sites et dégage toute responsabilité à propos de ces liens externes ou des liens créés par d’autres sites vers <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link>. {'\n'}</Text>

                            <Text style={styles.section_text}>La navigation sur le site <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link> est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. {'\n'}</Text>

                            <Text style={styles.section_text}>Un « cookie » est un fichier de petite taille qui enregistre des informations relatives à la navigation d’un utilisateur sur un site. Les données ainsi obtenues permettent d’obtenir des mesures de fréquentation, par exemple. {'\n'}</Text>

                            <Text style={styles.section_text}>Vous avez la possibilité d’accepter ou de refuser les cookies en modifiant les paramètres de votre navigateur. Aucun cookie ne sera déposé sans votre consentement. {'\n'}</Text>

                            <Text style={styles.section_text}>Les cookies sont enregistrés pour une durée maximale de 13 mois. {'\n'}</Text>

                            <Text style={styles.section_text}>Pour plus d’informations sur la façon dont nous faisons usage des cookies, lisez notre <Link style={styles.section_link} src={formData.privacy_policy_link}>Politique de confidentialité</Link>. {'\n'}</Text>

                            <Text style={styles.section_title}>6 – Droit applicable et attribution de juridiction.</Text>

                            <Text style={styles.section_text}>Tout litige en relation avec l’utilisation du site <Link style={styles.section_link} src={formData.site_url}>{formData.site_url}</Link> est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de {formData.courts_city}. {'\n'}</Text>

                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default PdfGenerator;