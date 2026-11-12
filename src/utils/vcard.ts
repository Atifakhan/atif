/**
 * Generates and downloads a .vcf (vCard) file for Muhammad Atif
 */
export function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Atif;Muhammad;;;
FN:Muhammad Atif
ORG:IOTA Solutions
TITLE:Network Infrastructure & Security Engineer
TEL;TYPE=CELL,VOICE:+923149881406
EMAIL;TYPE=PREF,INTERNET:atifat45@gmail.com
URL:https://atifakhan.github.io/portfolio/
NOTE:Cisco, Firewalls, VMware, Linux, Cloud & Enterprise IT Infrastructure.
X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/muhammad-atif-06480515b
X-SOCIALPROFILE;type=twitter:https://x.com/atifat45
X-SOCIALPROFILE;type=github:https://github.com/Atifakhan
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Muhammad_Atif.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
