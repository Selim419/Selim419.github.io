# selim419.github.io

Bu depo build çıktısı **tutmaz**. Kök site, içeriği
[`Selim419/subnautica-source`](https://github.com/Selim419/subnautica-source)
reposundan GitHub Actions ile yayınlar.

- Kaynak: <https://github.com/Selim419/subnautica-source>
- Canlı: <https://selim419.github.io/>
- Alt yol sürümü: <https://selim419.github.io/subnautica-derinlik-gunlugu/>

## Bu depoda ne var

| Dosya | Rol |
| --- | --- |
| `.github/workflows/deploy.yml` | `main` push'una tepki verir, `.deploy-source`'ta adı geçen commit'i derler ve yayınlar |
| `.deploy-source` | Bu deponun yayınlayacağı **kaynak** commit SHA'sı |

`deploy.yml` ilk adımda bu depoyu checkout edip `.deploy-source`'ı okur, sonra kaynak
repodan o commit'i `source/` altına çeker, `npm run build:root` ile derler,
`verify-base.mjs /` ile taban yolunu doğrular ve `actions/deploy-pages` ile yayınlar.

Yayınlamak için bu depoyu elle değiştirmen gerekmez:

```powershell
cd <kaynak repo>
node scripts/release.mjs
```

## Neden iki ayrı Pages deposu

Bu depo kök siteyi sunar; `Selim419/subnautica-derinlik-gunlugu` alt yolu. Aynı kaynak
kodu farklı taban yoluyla derlendiği için iki ayrı derleme gerekiyor. İkisi de
`subnautica-source`'dan beslenir.

Bu pipeline'da secret, token veya API anahtarı yoktur. `pages: write` ve
`id-token: write` izinlerini iş akışının kendi `GITHUB_TOKEN`'ı sağlar.
