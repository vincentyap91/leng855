# One-shot downloader for kh168.live landing page assets.
# Re-run safely: files that already exist are skipped.

$ErrorActionPreference = 'Continue'
$base = "$PSScriptRoot\..\public\assets"
New-Item -ItemType Directory -Force -Path $base | Out-Null

$map = @(
    # Header + flags
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_logo-202507070808100538.svg'; name = 'kh168-logo.svg' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/flag-uk-202507011318574705.svg'; name = 'flag-uk.svg' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/cambodia_flag_rounded_resize-202507011318342325.svg'; name = 'flag-cambodia.svg' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/flag-china-202410031642228471-202506261355454045-202507091826596271.svg'; name = 'flag-china.svg' },

    # Sidebar icons
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-hotgames%20(4)-202507071015414398.png'; name = 'icon-hotgames.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-home%20(2)-202507070812178580.png'; name = 'icon-home.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-all-game%20(2)-202507070813175179.png'; name = 'icon-all.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-casino%20(2)-202507070814542181.png'; name = 'icon-casino.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-slots%20(2)-202507070815546804.png'; name = 'icon-slots.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-sport%20(2)-202507070816441544.png'; name = 'icon-sport.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-fish%20(2)-202507070817130758.png'; name = 'icon-fish.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-crash-202507071004536977.png'; name = 'icon-rng.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-promo%20(2)-202507070818034819.png'; name = 'icon-promo.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-referral%20(2)-202507071001295462.png'; name = 'icon-referral.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-rebate%20(2)-202507071002484873.png'; name = 'icon-rebate.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/icon-recentgame%20(2)-202507071002048649.png'; name = 'icon-recent.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/android-202502061446084363-202601230740341521.png'; name = 'icon-android.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/spin%20wheel%20button-202501021417106102-202510231504261000.svg'; name = 'icon-spin-wheel.svg' },

    # Promo banners
    @{ url = 'https://pksoftcdn.azureedge.net/media/580x320px_grabourexclusivepromotion-202507070827220652.jpg'; name = 'banner-exclusive.jpg' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/580x320px_50_welcomebonus-202507070828594912.jpg'; name = 'banner-50-welcome.jpg' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/580x320px_10_dailybonus-202507070832018309.jpg'; name = 'banner-10-daily.jpg' },

    # Provider tiles (200x200) - these are the game cards
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_pgsoft_providericon_200x200px-202508270801347612.png'; name = 'tile-pgsoft.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_pragmaticplay_providericon_200x200px-202507100953217343.png'; name = 'tile-pragmatic.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_nextspin_providericon_200x200px-202507100954160879.png'; name = 'tile-nextspin.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_jilislot_providericon_200x200px-202507100926453656.png'; name = 'tile-jili.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_fachaislot_providericon_200x200px-202507301404140138.png'; name = 'tile-fachai.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_spadegamingslot_providericon_200x200px-202507301247095442.png'; name = 'tile-spadegaming.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_fastspinslot_providericon_200x200px-202507100959263005.png'; name = 'tile-fastspin.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_hacksaw_providericon_200x200px-202507310843262489.png'; name = 'tile-hacksaw.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_playtech_providericon_200x200px-202507311118496583.png'; name = 'tile-playtech.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_microgaming_providericon_200x200px-202507110826269819.png'; name = 'tile-microgaming.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_jokerslot_providericon_200x200px-202507100925525903.png'; name = 'tile-joker.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_vpower_providericon_200x200px-202507301456111939.png'; name = 'tile-vpower.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_playstar_providericon_200x200px-202507110825588066.png'; name = 'tile-playstar.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_pussy888_providericon_200x200px-202507110904059844.png'; name = 'tile-pussy888.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_mega888_providericon_200x200px-202507301528354323.png'; name = 'tile-mega888.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_relaxgaming_providericon_200x200px-202507311017265150.png'; name = 'tile-relaxgaming.png' },

    # Brand logos (color on dark) — used for Hot Providers + bottom brand strip
    @{ url = 'https://pksoftcdn.azureedge.net/media/pragmaticplay-202503240940078230.png'; name = 'brand-pragmatic.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/playstar-202502061538262634.png'; name = 'brand-playstar.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/spadegaming-202502061600056209.png'; name = 'brand-spadegaming.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/29-202407251624123384-202411040831361353-202502070949516082.png'; name = 'brand-saba.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/sagaming%20(3)-202503051252534800.png'; name = 'brand-sagaming.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/nextspin-202502071413029402.png'; name = 'brand-nextspin.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/cmdsport-202502101402373641.png'; name = 'brand-cmdsport.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/sexybaccarat-202502181538170726.png'; name = 'brand-sexybaccarat.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/fastspin-202502210902280790.png'; name = 'brand-fastspin.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/fachai-202503211648074951.png'; name = 'brand-fachai.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/wmcasino-202503190825574595-202505210844250471.png'; name = 'brand-wmcasino.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/microgaming-202503200856335044-202505210908103264.png'; name = 'brand-microgaming.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/spribe_bk-202411151353406968-202412271057117979-202505230900387799.png'; name = 'brand-spribe.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/evolutiongaming%20(3)-202510231504112064.png'; name = 'brand-evolution.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/joker-202507300955253661.png'; name = 'brand-joker.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/pussy888-202507300956532269.png'; name = 'brand-pussy888.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/mega_h5-202603260913292566.png'; name = 'brand-mega.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/dreamgaming%20(1)-202411130702146878-202507240835020928.png'; name = 'brand-dreamgaming.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/sabasport-202507310751404666.png'; name = 'brand-sabasport.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/hacksawgaming-202507310841493739.png'; name = 'brand-hacksaw.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/relaxgaming-202507311019072312.png'; name = 'brand-relaxgaming.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/pgsoft-202508270754214568.png'; name = 'brand-pgsoft.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/m2%20(1)-202510311314166157.png'; name = 'brand-m2.png' },

    # Big-win game thumbnails
    @{ url = 'https://pksoftcdn.azureedge.net/games/jili/461.png'; name = 'bigwin-charge-buffalo.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/games/jili/223.png'; name = 'bigwin-fortune-gems-2.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/games/jili/460.png'; name = 'bigwin-pirate-queen-2.png' },

    # Social icons
    @{ url = 'https://pksoftcdn.azureedge.net/media/fblogo-202510171517324383.png'; name = 'social-fb.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/tgmlogo-202510171517444540.png'; name = 'social-telegram.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/linelogo-202510171517566401.png'; name = 'social-line.png' },

    # Chat + download overlays
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_cs-202511280849094394.png'; name = 'chat-avatar.png' },
    @{ url = 'https://pksoftcdn.azureedge.net/media/kh168_floatingbanner_download@x2-202601230740314876.png'; name = 'floating-download.png' }
)

$count = 0
foreach ($item in $map) {
    $dest = Join-Path $base $item.name
    if (Test-Path $dest) {
        Write-Host "skip   $($item.name)"
        continue
    }
    try {
        Invoke-WebRequest -Uri $item.url -OutFile $dest -UseBasicParsing -ErrorAction Stop
        $count++
        Write-Host "  ok   $($item.name)"
    } catch {
        Write-Host "FAIL   $($item.name)  -  $($_.Exception.Message)"
    }
}
Write-Host "Downloaded $count files."
