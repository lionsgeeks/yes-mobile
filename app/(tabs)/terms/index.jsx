import TransText from '@/components/TransText';
import { useAppContext } from '@/context';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';

export default function TermsScreen() {
    const { language } = useAppContext();
    const textAlign = language === 'ar' ? 'text-right' : 'text-left';

    return (
        <ScrollView className="bg-white py-12 px-6"
        >
            <Text className={`text-2xl font-bold text-alpha mb-4 ${textAlign}`}>
                <TransText
                    en="📄 Terms of Service"
                    fr="📄 Conditions d'utilisation"
                    ar="📄 شروط الخدمة"
                />
            </Text>

            <Text className={`text-base text-gray-700 mb-2 ${textAlign}`}>
                <TransText
                    en="Welcome to our Event Platform!"
                    fr="Bienvenue sur notre plateforme d'événements !"
                    ar="مرحبًا بك في منصتنا للفعاليات!"
                />
            </Text>

            <Text className={`text-base text-gray-700 mb-4 ${textAlign}`}>
                <TransText
                    en="By creating an account or using our app, you agree to the following terms:"
                    fr="En créant un compte ou en utilisant notre application, vous acceptez les conditions suivantes :"
                    ar="من خلال إنشاء حساب أو استخدام تطبيقنا، فإنك توافق على الشروط التالية:"
                />
            </Text>

            {/* Section 1 */}
            <Text className={`text-lg font-semibold text-beta mb-2 ${textAlign}`}>
                <TransText
                    en="1. Your Account"
                    fr="1. Votre compte"
                    ar="1. حسابك"
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-1 ${textAlign}`}>
                <TransText
                    en="• You must be 13 years or older to use this app."
                    fr="• Vous devez avoir 13 ans ou plus pour utiliser cette application."
                    ar="• يجب أن يكون عمرك 13 عامًا أو أكثر لاستخدام هذا التطبيق."
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-1 ${textAlign}`}>
                <TransText
                    en="• You agree to provide a valid email for signing in."
                    fr="• Vous acceptez de fournir une adresse e-mail valide pour vous connecter."
                    ar="• أنت توافق على تقديم بريد إلكتروني صالح لتسجيل الدخول."
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-4 ${textAlign}`}>
                <TransText
                    en="• You’re responsible for keeping your login secure."
                    fr="• Vous êtes responsable de la sécurité de votre connexion."
                    ar="• أنت مسؤول عن الحفاظ على أمان تسجيل الدخول الخاص بك."
                />
            </Text>

            {/* Section 2 */}
            <Text className={`text-lg font-semibold text-beta mb-2 ${textAlign}`}>
                <TransText
                    en="2. Your Data"
                    fr="2. Vos données"
                    ar="2. بياناتك"
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-1 ${textAlign}`}>
                <TransText
                    en="• We only collect your email address to create and manage your account."
                    fr="• Nous collectons uniquement votre adresse e-mail pour créer et gérer votre compte."
                    ar="• نقوم بجمع عنوان بريدك الإلكتروني فقط لإنشاء حسابك وإدارته."
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-1 ${textAlign}`}>
                <TransText
                    en="• You may optionally upload a profile image — this stays private unless you make it public."
                    fr="• Vous pouvez télécharger une photo de profil de manière optionnelle — elle reste privée sauf si vous la rendez publique."
                    ar="• يمكنك اختيار تحميل صورة ملف شخصي — تظل خاصة ما لم تقم بجعلها عامة."
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-4 ${textAlign}`}>
                <TransText
                    en="• We do not share or sell your data to anyone."
                    fr="• Nous ne partageons ni ne vendons vos données à qui que ce soit."
                    ar="• نحن لا نشارك أو نبيع بياناتك لأي طرف."
                />
            </Text>

            {/* Section 3 */}
            <Text className={`text-lg font-semibold text-beta mb-2 ${textAlign}`}>
                <TransText
                    en="3. Use of the App"
                    fr="3. Utilisation de l'application"
                    ar="3. استخدام التطبيق"
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-1 ${textAlign}`}>
                <TransText
                    en="• This platform is for connecting with NGO events, speakers, and other participants."
                    fr="• Cette plateforme sert à se connecter aux événements d'ONG, aux intervenants et aux autres participants."
                    ar="• تم تصميم هذه المنصة للتواصل مع فعاليات المنظمات غير الحكومية، والمتحدثين، والمشاركين الآخرين."
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-1 ${textAlign}`}>
                <TransText
                    en="• Please use the app respectfully — no spam, abuse, or impersonation is allowed."
                    fr="• Veuillez utiliser l'application de manière respectueuse — pas de spam, d'abus ou d'usurpation d'identité."
                    ar="• يرجى استخدام التطبيق بشكل محترم — يُمنع البريد العشوائي أو الإساءة أو انتحال الهوية."
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-4 ${textAlign}`}>
                <TransText
                    en="• We may suspend accounts that break these rules."
                    fr="• Nous pouvons suspendre les comptes qui enfreignent ces règles."
                    ar="• قد نقوم بتعليق الحسابات التي تنتهك هذه القواعد."
                />
            </Text>

            {/* Section 4 */}
            <Text className={`text-lg font-semibold text-beta mb-2 ${textAlign}`}>
                <TransText
                    en="4. Content"
                    fr="4. Contenu"
                    ar="4. المحتوى"
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-1 ${textAlign}`}>
                <TransText
                    en="• You may see content shared by other users (like names, bios, or event info)."
                    fr="• Vous pouvez voir du contenu partagé par d'autres utilisateurs (noms, biographies, ou informations d'événement)."
                    ar="• قد ترى محتوىً تمت مشاركته من قبل مستخدمين آخرين (مثل الأسماء أو السير الذاتية أو معلومات الفعالية)."
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-4 ${textAlign}`}>
                <TransText
                    en="• Don’t copy, reuse, or misuse this content."
                    fr="• Ne copiez, réutilisez ou abusez pas de ce contenu."
                    ar="• لا تقم بنسخ أو إعادة استخدام أو إساءة استخدام هذا المحتوى."
                />
            </Text>

            {/* Section 5 */}
            <Text className={`text-lg font-semibold text-beta mb-2 ${textAlign}`}>
                <TransText
                    en="5. Changes & Updates"
                    fr="5. Modifications et mises à jour"
                    ar="5. التغييرات والتحديثات"
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-4 ${textAlign}`}>
                <TransText
                    en="• We may update these terms from time to time. We’ll let you know if anything important changes."
                    fr="• Nous pouvons mettre à jour ces conditions de temps en temps. Nous vous informerons en cas de changements importants."
                    ar="• قد نقوم بتحديث هذه الشروط من وقت لآخر. سنُعلمك إذا حدثت تغييرات مهمة."
                />
            </Text>

            {/* Section 6 */}
            <Text className={`text-lg font-semibold text-beta mb-2 ${textAlign}`}>
                <TransText
                    en="6. Contact"
                    fr="6. Contact"
                    ar="6. التواصل"
                />
            </Text>
            <Text className={`text-base text-gray-700 mb-5 ${textAlign}`}>
                <TransText
                    en="Have questions? Reach out at: "
                    fr="Des questions ? Contactez-nous à : "
                    ar="هل لديك أسئلة؟ تواصل معنا عبر: "
                />
                <Text className="text-alpha font-semibold"
                    onPress={() => Linking.openURL('mailto:contact@youthempowermentsummit.africa')}
                >contact@youthempowermentsummit.africa</Text>
            </Text>

            <View className='mt-12'></View>
        </ScrollView>
    )
}