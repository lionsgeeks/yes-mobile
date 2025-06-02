import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Navbar from "@/components/navigation/navbar";
import { useAppContext } from '@/context';
import api from '@/api';
import { Button } from '@react-navigation/elements';
import ShareEvent from "@/components/ShareEvent";
import { useAuthContext } from '@/context/auth';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import TransText from '@/components/TransText';
import handleBack from "@/utils/handleBack";

export default function Badge() {
    const panHandlers = handleBack("/");
    const { badge } = useAppContext();

    const downloadBadge = async () => {
        const html = `

   <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GITEX Africa Badge Generator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" integrity="sha512
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', sans-serif;
        }

        .container {
            max-width: 1200px;
        }
        .a4-page {
            width: 200mm;
            min-height: 270mm;
            background: white;
        }

        .badge-container {
            display: flex;
            page-break-inside: avoid;
        }

        .badge-left {
            width: 50%;
            height: 135mm;
            border-right: 1px dashed #ccc;
            padding: 15px;
            position: relative;
        }

        .badge-right {
            width: 50%;
            height: 135mm;
            padding: 15px;
            position: relative;
        }

        /* Text Direction */
        .rtl {
            direction: rtl;
        }

        /* Patronage Text */
        .patronage-text {
            margin-bottom: 10px;
        }

        .patronage-text p {
            font-size: 10px;
            margin-bottom: 3px;
        }

        /* GITEX Logo and Header */
        .gitex-header {
            margin-bottom: 15px;
        }

        .gitex-logo-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .gitex-logo h1 {
            font-size: 36px;
            font-weight: 900;
            letter-spacing: -1px;
            line-height: 1;
        }

        .gitex-logo p {
            font-size: 14px;
            font-weight: 500;
        }

        .morocco {
            color: #b09417;
            font-style: italic;
            padding-left: 12px;
        }

        .marrakech {
            color: #b09417;
            font-weight: bold;
        }

        .event-date {
            font-size: 12px;
            margin-top: 5px;
        }

        .logo-small-container {
            display: flex;
            gap: 8px;
        }

        .logo-small {
            width: 40px;
            height: 40px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #666;
        }

        /* Attendee Info */
        .attendee-info {
            margin-top: 30px;
        }

        .attendee-name {
            font-size: 18px;
            font-weight: 900;
            text-transform: uppercase;
            margin-bottom: 5px;
        }

        .attendee-role,
        .attendee-company,
        .attendee-country {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 5px;
        }

        /* Badge Type */
        .badge-type {
            font-size: 18px;
            font-weight: 900;
            text-transform: uppercase;
            margin-top: 20px;
        }

        /* QR Code */
        .qr-code {
            margin-top: 80px;
            text-align: center;
        }

 

        .qr-code-img {
            width: 50px;
            height: 50px;
            background-color: #f0f0f0;
            margin: 80px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #666;
        }


        /* Red Footer */
        .red-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 57px;
            background-color: #2e539d;
        }

        /* Right Side Styles */
        .institutional-partners {
            margin-bottom: 15px;
        }

        .institutional-partners p {
            font-size: 10px;
            text-align: right;
            margin-bottom: 5px;
        }

        .partners-logos {
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            justify-content: center;
            align-items: center;
            margin: 5px 0;
        }

        .logo-container {
            flex: 0 0 15%;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
        }

        .logo-container img {
            max-width: 100%;
            height: auto;
            max-height: 90px;
            object-fit: contain;
            mix-blend-mode: multiply;
        }


        .floor-plan img{
            width: 86mm;
            height: 115px;
            margin-left:20px;
            border-radius:10px;
        }


        /* Event Info */
        .event-info-container {
            margin-top: 15px;
        }

        .event-info {
            display: flex;
            justify-content:center;
            align-items:start;
            gap: 10px;
            margin-bottom: 10px;
        }

        .event-info-icon {
            font-size: 16px;
        }

        .event-info-text {
            font-size: 12px;
        }

        .event-day {
            margin-bottom: 3px;
        }

        .event-day span {
            color: #b09417;
            font-weight: bold;
        }

        /* App Download */
        .app-download {
            margin-top: 15px;
            text-align: center;
        }

        .app-download-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .app-stores {
            display: flex;
            justify-content: center;
            gap: 10px;
        }

        .app-stores img {
            width: 90px;
            height: 25px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #666;
        }

        /* Social Section */
        .social-section {
            margin-top: 15px;
            background-color: #f0f0f0;
            padding: 10px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .social-icon {
            width: 20px;
            height: 20px;
            background-color: #0077b5;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: white;
        }

        .social-hashtag {
            font-size: 14px;
            font-weight: bold;
            color: #0077b5;
        }

        /* Find Your World */
        .find-world {
            margin-top: 15px;
            text-align: center;
        }

        .find-world p {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .world-events {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
        }

        .world-event {
            text-align: center;
        }

        .world-event-logo {
            width: 50px;
            height: 30px;
            background-color: #f0f0f0;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            color: #666;
        }

        .world-event-date {
            font-size: 8px;
            color: #666;
            margin-top: 2px;
        }

        /* Stand Info */
        .stand-info {
            margin-top: 15px;
            text-align: center;
        }

        .stand-info-box {
            display: inline-block;
            border: 1px solid #000;
            padding: 5px 15px;
            font-size: 12px;
            font-weight: bold;
        }

        /* Bottom Section */
        .bottom-section {
            border-top: 1px dashed #ccc;
            padding: 15px;
            display: grid;
            width: 100%;
            height: 135mm;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        /* Event Headline */
        .event-headline {
            margin-bottom: 20px;
        }

        .event-headline h2 {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .event-headline p {
            font-size: 12px;
        }

        /* Featuring */
        .featuring {
            margin-bottom: 20px;
        }

        .featuring p {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 8px;
            text-align: center;
        }

        .featuring img {
            width: 100%;
            height: 95px;
border-radius:10px;
        }


        /* Terms & Conditions */
        .terms-conditions {
            margin-bottom: 20px;
        }

        .terms-conditions h3 {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .terms-conditions ol {
            font-size: 10px;
            padding-left: 20px;
        }

        .terms-conditions li {
            margin-bottom: 5px;
        }

        .social-icons {
            display: flex;
            gap: 10px;
            margin-left: 38px;
        }

        .social-circle {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: white;
            color: #b09417;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
        }

        /* Right Info */
        .right-info {
            padding-left: 15px;
            min-height:100mm;
            border-left: 1px dashed #ccc;
        }

        .getting-to {
            margin-bottom: 15px;
        }

        .getting-to h3 {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 12px;
        }

        .getting-to p {
            font-size: 12px;
        }

        /* Event Venue */
        .event-venue,
        .parking-notice,
        .shuttle-info,
        .taxi-info,
        .public-transport {
            margin-bottom: 15px;
        }

        .event-venue h3 {
            font-size: 15px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .venue-container,
        .parking-container,
        .shuttle-container,
        .taxi-container,
        .transport-container {
            display: flex;
            gap: 10px;
        }

        .venue-icon,
        .parking-icon,
        .shuttle-icon,
        .taxi-icon,
        .transport-icon {
            font-size: 16px;
        }

        .venue-text,
        .parking-text,
        .shuttle-text,
        .taxi-text,
        .transport-text {
            font-size: 12px;
            flex: 1;
        }

        .parking-text p:first-child {
            font-weight: bold;
            margin-bottom: 3px;
        }

        .transport-text p:first-child {
            font-weight: bold;
            margin-bottom: 3px;
        }

        .qr-code2 {
            display: flex;
            justify-content: center;
            align-items:center;
            gap: 18px; 
        }
.qr{
    display: flex;
            justify-content: center;
            align-items:center;
            gap:10px;
}
        /* Website */
        .website {
            text-align: right;
            margin-top: 8px;
        }

        .website p {
            font-size: 15px;
            font-weight: bold;
        }

        .fle {
            display: flex;
            gap: 32px;
            justify-content: center;
            margin: 10px 7px;

        }

        .fle img {
            width: 70px;
            height: 70px;
        }

      @media print {
  @page {
    size: A4;
    margin: 0;
  }

  .header {
    display: none;
  }

  .a4-page {
    width: 210mm;
    height: 297mm;
    box-shadow: none;
    page-break-after: auto;
  }

  .badge-container {
    page-break-inside: avoid;
  }
}
    </style>
</head>

<body>
    <div class="container">
      
        <div class="a4-page">
            <div class="badge-container">
                <!-- Left Side of Badge -->
                <div class="badge-left">

                    <div class="gitex-header">
                        <div class="gitex-logo-container">
                            <div>
                                <div class="gitex-logo">
                                    <h1><i> YES </i></h1>
                                    <p style="padding-left:5px;">AFRICA</p>
                                    <p class="morocco">Morocco</p>
                                </div>
                                <div class="event-date">
                                    <p>19 - 20 Juin 2025 <span class="marrakech">MARRAKECH</span></p>
                                </div>
                            </div>
                            <div class="fle">
                                <div class="logo-small"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQur9cHxmm6RW6cOtQeRF2FXbJS0M8fo897BA&s" alt="YES AFRICA">
                                </div>
                                <div class="logo-small"><img src="https://panafricanyouthunion.org/wp-content/uploads/2022/10/PYU-logo.jpg" alt="YES AFRICA">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="attendee-info">
                        <div class="attendee-name">${badge.participant_name}</div>
                        <div class="attendee-company">${badge.participant_company}</div>
                        <div class="attendee-country">${badge.participant_country}</div>
                    </div>

                    <div class="badge-type">${badge.participant_role}</div>

                    <div class="qr-code">
                        <div class="qr-code-img"><img style="width:120px;" src="${api.IMAGE_URL}${badge.file_url}"></div>

                    </div>

 <div class="red-footer">
                        <p style=" font-size: 12px;margin-left:5px; font-weight: bold; margin-bottom: 8px;color:white;">
                            SUIVEZ-NOUS SUR</p>
                        <div class="social-icons">
                            <a href="https://www.linkedin.com" class="social-circle"
                                target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            <a href="https://www.facebook.com" class="social-circle"
                                target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com" class="social-circle"
                                target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="https://www.youtube.com" class="social-circle"
                                target="_blank"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>                </div>

                <!-- Right Side of Badge -->
                <div class="badge-right">
                    <div class="institutional-partners">
                        <p>INSTITUTIONAL PARTNERS</p>
                        <div class="partners-logos">
                            <div class="logo-container"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_nouveau_cosumar.png" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/UM6P_wordmark_%282024%29.svg/1200px-UM6P_wordmark_%282024%29.svg.png" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://youthempowermentsummit.africa/assets/kamlin-UhqmPctN.jpeg" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://mylionsgeek.ma/logo1.png" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://www.mednc.org/assets/front/img/logo.webp" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://t3.ftcdn.net/jpg/04/22/99/88/360_F_422998830_eq3BTaK5EgawSYSw9a93SR7bEFZtkQZF.jpg" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://africandigitalsummit.ma/wp-content/uploads/2024/10/logo-FC-media-1.jpeg" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://www.africanpowerplatform.org/images/Financing/Africa50_Logo.jpg" alt="Partenaire">
                            </div>
                            <div class="logo-container"><img src="https://www.atlas-mag.net/sites/default/files/images/AtlasMagazine_2025-04-No220/images/atlantic-re-scr.png" alt="Partenaire">
                            </div>
                        </div>
                    </div>

                    <div class="floor-plan"><img src="https://i.postimg.cc/QtrrBYPq/Capture-d-cran-2025-05-23-114438.png">
                    </div>

                    <div class="event-info-container">
                        <div class="event-info">
                            <div class="event-info-icon">📅</div>
                            <div class="event-info-text">
                                <div class="event-day">
                                    JEUDI 19 JUIN 2025 : 09h00 - 17h00
                                </div>
                                <div class="event-day">
                                    VENDREDI 20 JUIN 2025 : 09h00 - 21h00
                                </div>

                            </div>
                        </div>

                        <div class="event-info">
                            <div class="event-info-icon">📍</div>
                            <div class="event-info-text">
                                Av. du Président Kennedy,<br>
                                Marrakech, Morocco
                            </div>
                        </div>
                    </div>

                    <div class="app-download">
                        <div class="app-download-title">
                            Download the<br>
                            GITEX AFRICA Mobile App
                        </div>
                        <div class="app-stores">
                            <div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="Google Play">
                            </div>
                            <div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Available_on_the_App_Store_%28black%29_SVG.svg/2560px-Available_on_the_App_Store_%28black%29_SVG.svg.png" alt="App Store">
                            </div>
                        </div>
                    </div>

                    <div class="social-section">
                        <div class="social-icon">in</div>
                        <span class="social-hashtag">JOIN THE DEBATE #Youth Empowerment Summit - Africa</span>
                    </div>

                   
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="bottom-section">
                <div class="bot">
                    <div class="gitex-header">
                        <div class="gitex-logo-container">
                            <div>
                                <div class="gitex-logo">
                                    <h1><i> YES </i></h1>
                                    <p style="padding-left:5px;">AFRICA</p>
                                    <p class="morocco">Morocco</p>
                                </div>
                                <div class="event-date">
                                    <p>19 - 20 Juin 2025 <span class="marrakech">MARRAKECH</span></p>
                                </div>
                            </div>
                            <div class="fle">
                                <div class="logo-small"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQur9cHxmm6RW6cOtQeRF2FXbJS0M8fo897BA&s" alt="YES AFRICA">
                                </div>
                                <div class="logo-small"><img src="https://panafricanyouthunion.org/wp-content/uploads/2022/10/PYU-logo.jpg" alt="YES AFRICA">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="event-headline">
                        <h2>YOUTH EMPOWERMENT SUMMIT for AFRICA</h2>
                        <p>RETROUVE-NOUS POUR VIVRE ENSEMBLE CETTE AVENTURE PANAFRICAINE !</p>
                    </div>

                    <div class="featuring">
                        <p>AGENCES DES NATIONS UNIES :</p>
                        <div class="feature-logos">
                            <img src="https://i.postimg.cc/zBctB23K/Capture-d-cran-2025-05-22-154115.png">
                        </div>
                    </div>

                    <div class="terms-conditions">
                        <h3>PLAIDOYER YES Africa :</h3>
                        <ol>
                            <li>
                                <strong>POLICY PAPER :</strong><br>
                               Il analysera les défis de l'emploi des jeunes NEET en Afrique,
                                mettra en lumière les enjeux clés du projet et proposera des recommandations concrètes.
                                 Ce document sera élaboré avec le Social Innovation Lab de l’UM6P,
                                  en collaboration avec tous les acteurs concernés.
                            </li>
                            <li>
                                <strong>MANIFESTE :</strong><br>
                                Il déclarera la vision, les valeurs et les engagements collectifs pour la promotion
                                de l'emploi des jeunes et l'inclusion des NEET. Ce document mobilisateur lancera un
                                appel à l'action pour l'ensemble des parties prenantes et établira un cadre de référence
                                pour les actions conjointes à mener dans les différents pays africains.
                            </li>
                        </ol>
                    </div>



                </div>

                <div class="right-info">
                    <div class="getting-to">
                        <h3>SE RENDRE À YES AFRICA</h3>
                        <p>Nous recommandons vivement l’utilisation des transports en commun pour accéder facilement au
                            lieu du sommet.</p>
                    </div>

                    <div class="event-venue">
                        <h3>LIEU DE L'ÉVÉNEMENT</h3>
                        <div class="venue-container">
                            <div class="venue-icon">📍</div>
                            <div class="venue-text">
                                Hôtel Kenzi Rose Garden<br>
                Avenue du Président Kennedy, Marrakech, Maroc
                            </div>
                        </div>
                    </div>

                    <div class="parking-notice">
                        <div class="parking-container">
                            <div class="parking-icon">🚗</div>
                            <div class="parking-text">
                                <p>STATIONNEMENT</p>
                                <p>Aucun parking n’est disponible sur place. Veuillez utiliser les parkings publics à
                                    proximité.</p>
                            </div>
                        </div>
                    </div>

                    <div class="shuttle-info">
                        <div class="shuttle-container">
                            <div class="shuttle-icon">🚌</div>
                            <div class="shuttle-text">
                                <p>Des navettes gratuites assureront la liaison entre les parkings et le lieu de
                                    l’événement.</p>
                            </div>
                        </div>
                    </div>

                    <div class="taxi-info">
                        <div class="taxi-container">
                            <div class="taxi-icon">🚕</div>
                            <div class="taxi-text">
                                <p>Deux types de taxis sont disponibles à Marrakech : Petits Taxis (intra-muros) et
                                    Grands Taxis (longue distance). Il est conseillé de réserver à l’avance en cas
                                    d’affluence.</p>
                            </div>
                        </div>
                    </div>

                    <div class="public-transport">
                        <div class="transport-container">
                            <div class="transport-icon">🚍</div>
                            <div class="transport-text">
                                <p>TRANSPORT PUBLIC</p>
                                <p>Des lignes de bus desservent l’avenue du Président Kennedy à proximité de l’Hôtel
                                    Kenzi Rose Garden.</p>
                            </div>
                        </div>
                    </div>

                    <h4 style="text-align:center;">APPLICATION YES AFRICA</h4>
                    <div class="qr-code2" style="margin-top:10px;">
                        <div class="qr">
                            <img style="width:15px;" src="https://img.utdstc.com/icon/5c9/3c4/5c93c4f2937078690d2e9c42fe12a46f9d32ae270eaaed84142fdd10c4e58740:200">
                            <img style="width:48px;" src="${api.IMAGE_URL}${badge.file_url}">
                        </div>
                        <div class="qr">
                            <img style="width:15px;" src="https://upload.wikimedia.org/wikipedia/fr/0/09/Logo_App_Store_d%27Apple.png">
                        <img style="width:52px;" src="https://app.youthempowermentsummit.africa/storage/qrcodes/qrApp.png" alt="QR Code" />
                            
                        </div>
                    </div>
                    <div class="website" style="margin-bottom:10px;">
                        <p>www.yesafrica.net</p>
                    </div>

                </div>

            </div>
        </div>
    </div>

</body>

</html>

        `;

        try {
            const { uri } = await Print.printToFileAsync({ html });

            if (Platform.OS === 'android') {
                const perm = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
                if (perm.granted) {
                    const file = await FileSystem.StorageAccessFramework.createFileAsync(perm.directoryUri, 'badge.pdf', 'application/pdf');

                    const base64Content = await FileSystem.readAsStringAsync(uri, {
                        encoding: FileSystem.EncodingType.Base64
                    });

                    await FileSystem.StorageAccessFramework.writeAsStringAsync(file, base64Content, {
                        encoding: FileSystem.EncodingType.Base64
                    });
                }
            } else {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Enregistrer le badge',
                    UTI: 'com.adobe.pdf'
                });
            }

            Alert.alert('Succès', 'Fichier enregistré avec succès');
        } catch (error) {
            console.error('Erreur lors de la génération du badge :', error);
            Alert.alert('Erreur', 'Impossible de générer le fichier');
        }
    };

    return (
        <View {...panHandlers} className="flex-1 bg-white pt-10 ">
            <Navbar title=<TransText en="Badge" fr="Badge" ar="شارة" /> />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                className="px-4"
            >
                <View className="flex-1  w-full px-4 rounded-2xl bg-white shadow-lg overflow-hidden">
                    {/* Header */}
                    <View className="bg-alpha p-6 items-center justify-center">
                        <Text className="text-white text-lg font-bold">Youth Empowerment Summit</Text>
                        <Text className="text-white text-base opacity-90 mt-1">Juin 2025 - Marrakech</Text>
                    </View>

                    {/* Profile Section */}
                    <View className="items-center py-6">
                        <View className="w-26 h-26 border-4 border-beta rounded-full items-center justify-center mb-4 overflow-hidden">
                            {badge.participant_image && (
                                <Image
                                    source={{ uri: `${api.IMAGE_URL}${badge.participant_image}` }}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                    resizeMode="cover"
                                />
                            )}
                        </View>

                        <Text className="text-2xl font-bold text-gray-800">{badge.participant_name}</Text>
                        <Text className="text-lg font-semibold text-beta">{badge.participant_role}</Text>
                        <Text className="text-base text-gray-500 mb-5">{badge.participant_company}</Text>

                        <View className="flex-row justify-center mb-4">
                            <View className="px-4 py-2 bg-alpha rounded-full mx-1">
                                <Text className="text-white text-sm font-bold">ATTENDEE</Text>
                            </View>
                            <View className="px-4 py-2 bg-beta rounded-full mx-1">
                                <Text className="text-white text-sm font-bold">{badge.participant_role}</Text>
                            </View>
                        </View>
                    </View>

                    {/* QR Section */}
                    <View className="px-6 py-5 items-center rounded-b-2xl space-y-4">
                        <SvgUri
                            uri={api.IMAGE_URL + badge.file_url}
                            width={200}
                            height={200}
                        />
                        <Text className="text-gray-600 text-base font-semibold pt-8">Scan for verification</Text>
                        <View className="w-full border-t border-gray-300" />
                        <Text className="text-gray-500 text-sm text-center">
                            This badge must be worn at all times during the event.
                        </Text>
                        <View className="flex-row justify-center items-center w-full mt-4 gap-x-4">
                            <TouchableOpacity onPress={downloadBadge}>
                                <Text className="text-white bg-alpha p-3 rounded-xl text-m font-semibold">Download Badge</Text>
                            </TouchableOpacity>

                            <ShareEvent />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
