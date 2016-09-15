import mainBowerFiles from 'main-bower-files';

var vendorAssetsOther = [
  path.join('bower_components', 'foundation-icon-fonts', '**/*.{eot,svg,ttf,woff}')
];

export const VENDOR_ASSETS = mainBowerFiles().concat(
  vendorAssetsOther,
  config.env.vendor
);

const assetsVendor = {
  src: VENDOR_ASSETS,
  dest: config.DIST
};

gulp.task('assets:vendor', function() {
  return gulp.src(assetsVendor.src, {base: '.'})
  .pipe(gulp.dest(assetsVendor.dest));
});
