function linkjs() {
  # local current_dir=$(pwd)
  for abs_package_path in /Users/Katie/Documents/Sentry/sentry-javascript/packages/*; do
    link_package $abs_package_path $(basename $abs_package_path)
    # local package=$(basename $abs_package_path)

    # echo "Setting up @sentry/${package} for linking"
    # cd $abs_package_path
    # yarn link

    # cd $current_dir
    # echo "Linking @sentry/$package"
    # yarn link "@sentry/$package"
  done

  # TODO - this doesn't work for non-repo packages
  echo "WARNING: @sentry/cli, @sentry/webpack-plugin, and @sentry/wizard not linked"
}

function link_package() {
  local package_abs_path=$1
  local package_name=$2
  local current_dir=$(pwd)

  echo "Setting up @sentry/${package_name} for linking"
  cd $package_abs_path
  yarn link

  cd $current_dir
  echo "Linking @sentry/$package_name"
  yarn link "@sentry/$package_name"

}

function linkcli() {
  link_package $CLI_REPO "cli"
}

function linkplugin() {
  link_package $WEBPACK_PLUGIN_REPO "webpack-plugin"
}

function linkwizard() {
  link_package $WIZARD_REPO "wizard"
}
