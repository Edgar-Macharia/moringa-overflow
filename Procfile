web: rake db:migrate && rake db:reset && bin/rails server -b 0.0.0.0 -p ${PORT:-3000}
# # Procfile

# setup: curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash -s stable && printf '\neval "$(~/.rbenv/bin/rbenv init -)"' >> /root/.profile && . /root/.profile && rbenv install 3.1.2 && rbenv global 3.1.2 && gem install bundler:2.3.7 && bundle install && bundle exec rake assets:precompile && bundle exec bootsnap precompile app/ lib/ 

# install: bundle install

# build: bundle exec rake assets:precompile && bundle exec bootsnap precompile app/ lib/

# start: rake db:migrate && bin/rails server -b 0.0.0.0 -p ${PORT:-3000}
