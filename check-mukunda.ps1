<#
=====================================================================
 check-mukunda.ps1
 mukundainfraventures.in : SEO fix pack checker (Windows PowerShell)

 KYA KARTA HAI
   Part A  LOCAL  : aapke project ke code mein changes aaye ya nahi
   Part B  LIVE   : server par upload/deploy hue ya nahi (raw response)

 CHALANE KA TAREEKA (PowerShell mein)
   cd "C:\Users\hp\Documents\office\mukunda (2)\mukunda"
   powershell -ExecutionPolicy Bypass -File .\check-mukunda.ps1

   Sirf local  : .\check-mukunda.ps1 -SkipLive
   Sirf live   : .\check-mukunda.ps1 -SkipLocal
   Staging     : .\check-mukunda.ps1 -Base https://staging.example.com

 CHANGES KI LIST (fix pack se)
   Stage 1  title/description/H1, keywords tag hatana, hero video 3 MB
            loop + poster, placeholder schema hatana + schema-sitewide.json,
            href="#" links, footer /home, WhatsApp wa.me, email
            info@mukundainfraventures.in, MahaRERA numbers homepage par,
            project pages ke naye title/H1
   Stage 2  /terms /privacy /404 prerender, /index.html -> / (301),
            unknown URL par asli 404, sitemap mein terms/privacy
   Stage 3  client input par depend (is script mein sirf sample check)

 NOTE: Ye script tested nahi hai. Kisi check ka pattern aapke code se
 match na kare to $LocalChecks / $LiveChecks mein pattern badal lijiye.
=====================================================================
#>

param(
    [string]$ProjectPath = (Get-Location).Path,
    [string]$Base = "https://mukundainfraventures.in",
    [switch]$SkipLocal,
    [switch]$SkipLive
)

$Base = $Base.TrimEnd('/')
$UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36"
$script:pass = 0
$script:fail = 0

function Report([bool]$ok, [string]$label, [string]$detail = "") {
    if ($ok) {
        Write-Host ("  PASS  " + $label) -ForegroundColor Green
        $script:pass++
    } else {
        Write-Host ("  FAIL  " + $label) -ForegroundColor Red
        if ($detail) { Write-Host ("        " + $detail) -ForegroundColor DarkGray }
        $script:fail++
    }
}

# ---------------------------------------------------------------
# PART A : LOCAL CODE
# ---------------------------------------------------------------
if (-not $SkipLocal) {
    Write-Host ""
    Write-Host "PART A: LOCAL CODE  ($ProjectPath)" -ForegroundColor Cyan

    if (-not (Test-Path (Join-Path $ProjectPath "angular.json"))) {
        Write-Host "  angular.json nahi mila. Project folder se chalaiye ya -ProjectPath do." -ForegroundColor Yellow
    } else {
        $dirs = @("src", "public") | ForEach-Object { Join-Path $ProjectPath $_ } | Where-Object { Test-Path $_ }
        $files = @()
        foreach ($d in $dirs) {
            $files += Get-ChildItem -Path $d -Recurse -File -Include *.html, *.ts, *.json, *.txt, *.xml, *.htaccess -ErrorAction SilentlyContinue |
                Where-Object { $_.FullName -notmatch '\\admin\\' -and $_.Name -notmatch '\(\d+\)' }
        }
        foreach ($n in @("prerender-routes.txt", "angular.json")) {
            $p = Join-Path $ProjectPath $n
            if (Test-Path $p) { $files += Get-Item $p }
        }

        function Local-Has([string]$text) {
            $hit = $files | Select-String -Pattern $text -SimpleMatch -List -ErrorAction SilentlyContinue
            return [bool]$hit
        }
        function Local-Where([string]$text) {
            ($files | Select-String -Pattern $text -SimpleMatch -ErrorAction SilentlyContinue |
                Select-Object -First 3 | ForEach-Object { $_.Path.Replace($ProjectPath, "") + ":" + $_.LineNumber }) -join "  |  "
        }

        # (label, pattern, mustExist)
        $LocalChecks = @(
            @("placeholder schema phone hata diya",        "XXXXXXXXXX",                                  $false),
            @("schema mein TODO address nahi",             '"TODO"',                                      $false),
            @("purana email info@keshavam.com nahi",       "info@keshavam.com",                           $false),
            @("koi keshavam.com email nahi (&#64; bhi)",    "keshavam.com",                                $false),
            @("web.whatsapp.com nahi (wa.me use ho)",      "web.whatsapp.com",                            $false),
            @("koi href=""#"" link nahi",                  'href="#"',                                    $false),
            @("footer/menu mein href=""/home"" nahi",      'href="/home"',                                $false),
            @("meta keywords tag hata diya",               'name="keywords"',                             $false),
            @("Zoho placeholder code nahi",                "YOUR_ZOHO_WIDGET_CODE",                       $false),
            @("naya homepage title laga (index.html)",     "Industrial Plots in Nagpur",                  $true),
            @("hero poster image laga",                    "hero-poster",                                 $true),
            @("sitewide schema graph (@graph) laga",        "@graph",                                      $true)
        )

        foreach ($c in $LocalChecks) {
            $label = $c[0]; $pat = $c[1]; $must = $c[2]
            $found = Local-Has $pat
            if ($must) {
                Report $found $label "'$pat' code mein nahi mila"
            } else {
                Report (-not $found) $label ("abhi bhi mila: " + (Local-Where $pat))
            }
        }

        # Hero video size
        $videoDirs = @("src\assets\vedio", "src\assets\video", "public\assets\video", "public\assets\vedio") |
            ForEach-Object { Join-Path $ProjectPath $_ } | Where-Object { Test-Path $_ }
        $big = @()
        foreach ($vd in $videoDirs) {
            $big += Get-ChildItem $vd -File -Include *.mp4, *.webm -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 5MB }
        }
        $names = ($big | ForEach-Object { $_.Name + " (" + [math]::Round($_.Length / 1MB, 1) + " MB)" }) -join ", "
        Report ($big.Count -eq 0) "koi video 5 MB se bada nahi (hero loop < 3 MB)" $names

        # File-scoped checks (poore src mein dhundne se galat PASS aata tha)
        function Scoped([string]$namePart, [string]$needle, [string]$label) {
            $f = $files | Where-Object { $_.FullName -like ("*" + $namePart + "*") }
            if (-not $f) { Report $false $label ("file nahi mili: " + $namePart); return }
            $hit = $f | Select-String -Pattern $needle -SimpleMatch -List -ErrorAction SilentlyContinue
            Report ([bool]$hit) $label ($namePart + " mein '" + $needle + "' nahi mila")
        }
        Scoped "sticky-contact.component.html"  "wa.me"                          "sticky-contact mein wa.me link"
        Scoped "home-office.component.html"     "P50500055060"                   "homepage component mein MahaRERA number"

        # app.routes.server.ts: terms / privacy / 404 prerender
        $srv = Get-ChildItem (Join-Path $ProjectPath "src") -Recurse -Filter "app.routes.server.ts" -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($srv) {
            $st = Get-Content $srv.FullName -Raw
            foreach ($r in @("terms", "privacy", "404")) {
                Report ($st -match ("path:\s*['""]" + $r + "['""]")) "app.routes.server.ts mein '$r' route (Prerender)" "add: { path: '$r', renderMode: RenderMode.Prerender }"
            }
        } else {
            Write-Host "  (app.routes.server.ts nahi hai: is project mein routes prerender-routes.txt se chalte hain, skip)" -ForegroundColor Yellow
        }

        # prerender-routes.txt
        $pr = Join-Path $ProjectPath "prerender-routes.txt"
        if (Test-Path $pr) {
            $txt = Get-Content $pr -Raw
            Report ($txt -match "/terms" -and $txt -match "/privacy") "prerender-routes.txt mein /terms aur /privacy" "prerender-routes.txt mein add kijiye"
        }

        # Build output (agar ng build chala hai)
        $dist = Get-ChildItem (Join-Path $ProjectPath "dist") -Directory -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($dist) {
            $browser = Join-Path $dist.FullName "browser"
            if (Test-Path $browser) {
                foreach ($r in @("terms", "privacy", "404")) {
                    Report (Test-Path (Join-Path $browser "$r\index.html")) "build mein $r\index.html bana" "ng build dobara chalaiye aur routes check kijiye"
                }
            }
        } else {
            Write-Host "  (dist folder nahi mila: build check skip. ng build chalakar dobara try karein)" -ForegroundColor Yellow
        }
    }
}

# ---------------------------------------------------------------
# PART B : LIVE SERVER
# ---------------------------------------------------------------
if (-not $SkipLive) {
    Write-Host ""
    Write-Host "PART B: LIVE SITE  ($Base)" -ForegroundColor Cyan

    Add-Type -AssemblyName System.Net.Http
    $handler = New-Object System.Net.Http.HttpClientHandler
    $handler.AllowAutoRedirect = $false
    $handler.AutomaticDecompression = [System.Net.DecompressionMethods]'GZip,Deflate'
    $client = New-Object System.Net.Http.HttpClient($handler)
    $client.Timeout = [TimeSpan]::FromSeconds(30)
    [void]$client.DefaultRequestHeaders.UserAgent.ParseAdd($UA)

    function Get-Page([string]$url) {
        try {
            $resp = $client.GetAsync($url).Result
            $body = $resp.Content.ReadAsStringAsync().Result
            $loc = ""
            if ($resp.Headers.Location) { $loc = $resp.Headers.Location.ToString() }
            return @{ Status = [int]$resp.StatusCode; Body = $body; Location = $loc }
        } catch {
            return @{ Status = 0; Body = ""; Location = "" }
        }
    }
    function Get-Title([string]$html) {
        $m = [regex]::Match($html, '(?s)<title>(.*?)</title>')
        if ($m.Success) { return $m.Groups[1].Value.Trim() } else { return "" }
    }
    function Get-H1([string]$html) {
        $m = [regex]::Match($html, '(?s)<h1[^>]*>(.*?)</h1>')
        if ($m.Success) { return ([regex]::Replace($m.Groups[1].Value, '<[^>]*>', '') -replace '\s+', ' ').Trim() } else { return "" }
    }

    $homePage = Get-Page "$Base/"
    if ($homePage.Status -ne 200) {
        Report $false "homepage 200 deta hai" ("status = " + $homePage.Status + " (internet/URL check kijiye)")
    } else {
        $h = $homePage.Body
        $t = Get-Title $h
        $h1 = Get-H1 $h

        Report ($t -match "(?i)plots")                          "homepage title mein 'plots'"                  "title = $t"
        Report ($h1 -match "(?i)plots")                         "homepage H1 mein 'plots in Nagpur'"           "H1 = $h1"
        Report ($h.Contains("P50500055060"))                    "MahaRERA number homepage par"                 ""
        Report (-not $h.Contains("XXXXXXXXXX"))                 "placeholder schema hata"                      ""
        Report (-not $h.Contains('href="#"'))                   "koi href=""#"" nahi"                          ""
        Report (-not $h.Contains("info@keshavam.com"))          "email apne domain ka"                         ""
        Report (-not $h.Contains("web.whatsapp.com"))           "WhatsApp wa.me use karta hai"                 ""
        Report (-not $h.Contains('href="/home"'))               "footer Home link /"                           ""
        Report (-not ($h -match 'name="keywords"'))             "meta keywords tag nahi"                       ""
        Report ($h.Contains("hero-poster"))                     "hero poster laga"                             ""
    }

    # Stage 2: har page apne naam se
    $terms = Get-Page "$Base/terms"
    Report (($terms.Status -eq 200) -and ((Get-Title $terms.Body) -match "(?i)terms")) "/terms ka apna title" ("status " + $terms.Status + ", title = " + (Get-Title $terms.Body))

    $priv = Get-Page "$Base/privacy"
    Report (($priv.Status -eq 200) -and ((Get-Title $priv.Body) -match "(?i)privacy")) "/privacy ka apna title" ("status " + $priv.Status + ", title = " + (Get-Title $priv.Body))

    $junk = Get-Page ("$Base/abcxyz-" + (Get-Random))
    Report ($junk.Status -eq 404) "galat URL par asli 404" ("status = " + $junk.Status)

    $idx = Get-Page "$Base/index.html"
    $idxOk = ($idx.Status -eq 301) -and ($idx.Location.TrimEnd('/') -eq $Base -or $idx.Location -eq "/")
    Report $idxOk "/index.html -> / (301)" ("status = " + $idx.Status + ", location = " + $idx.Location)

    # Project pages: titles
    $pages = @{
        "/karmabhumi"       = "(?i)Karmabhoomi: Industrial";
        "/ayodhya"          = "(?i)Ayodhya: Residential";
        "/vraj"             = "(?i)Vraj: Residential";
        "/dwarka"           = "(?i)Dwarka: Residential";
        "/keshavam-city-9"  = "(?i)Keshavam City 9: Plots";
        "/keshavam-city-10" = "(?i)Keshavam City 10: Plots";
        "/career"           = "(?i)Careers at"
    }
    foreach ($k in $pages.Keys) {
        $p = Get-Page ($Base + $k)
        $pt = Get-Title $p.Body
        Report (($p.Status -eq 200) -and ($pt -match $pages[$k])) ("$k ka naya title") ("status " + $p.Status + ", title = " + $pt)
    }

    # Keshavam City 10 : sirf ek H1
    $k10 = Get-Page "$Base/keshavam-city-10"
    $h1count = ([regex]::Matches($k10.Body, '<h1[\s>]')).Count
    Report ($h1count -eq 1) "/keshavam-city-10 mein sirf 1 H1" "H1 count = $h1count"

    # Sitemap
    $sm = Get-Page "$Base/sitemap.xml"
    Report (($sm.Body -match "/terms") -and ($sm.Body -match "/privacy")) "sitemap mein /terms aur /privacy" ""
}

# ---------------------------------------------------------------
Write-Host ""
$total = $script:pass + $script:fail
$color = "Green"
if ($script:fail -gt 0) { $color = "Yellow" }
Write-Host ("RESULT: " + $script:pass + " / " + $total + " PASS, " + $script:fail + " FAIL") -ForegroundColor $color
Write-Host "Local PASS + Live FAIL = code ho gaya, par abhi server par upload/deploy nahi hua." -ForegroundColor DarkGray